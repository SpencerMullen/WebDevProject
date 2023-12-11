import { Box, ChakraProvider, Grid, GridItem, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GenreSelectionForm.css';

interface GenreSelectionFormProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}
const GenreSelectionForm: React.FC<GenreSelectionFormProps> = ({ selectedGenres, setSelectedGenres }) => {
  const [genreData, setGenreData] = useState([]);
  // data is stored:  genreId: genreName
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:8081/genres/movies')
        setGenreData(response.data);
        console.log(response)
      } catch (e) {
        console.error('Error fetching genres:', e);
        setError('Error fetching genres. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);
  
  const handleGenreClick = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else if (selectedGenres.length < 5) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  const isGenreSelected = (genre: string) => selectedGenres.includes(genre);

  return (
    <ChakraProvider>
      <VStack spacing={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="3xl" mb={4} style={{marginTop: "30px"}}> Select up to 5 of your top Genres </Text>
          <Icon as={show ? ChevronUpIcon : ChevronDownIcon} onClick={toggleShow} />                 
        </HStack>
        {show && (
          <> 
            {loading && <Text>Loading genres...</Text>}
            {error && <Text color="red">{error}</Text>}
            {!loading && !error && (
              <Box className="genre-form-container">

                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {genreData.map((genre) => (
                    <GridItem key={genre.id}>
                      <Box
                        className={`genre-card ${isGenreSelected(genre) ? 'selected' : ''} ${selectedGenres.length >= 5 && !isGenreSelected(genre) ? 'grayed' : ''}`}
                        onClick={() => handleGenreClick(genre)}
                      >
                        <Text>{genre.name}</Text>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </Box>)}
          </>
        )}
      </VStack>
    </ChakraProvider>
  );
};

export default GenreSelectionForm;
