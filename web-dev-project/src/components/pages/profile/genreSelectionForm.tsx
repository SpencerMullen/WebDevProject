import { Box, Button, ChakraProvider, Grid, GridItem, Text, VStack, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GenreSelectionForm.css';
import  getGenreOptions from '../../../../../backend/movie/Genre/getGenreOptions'

const GenreSelectionForm: React.FC = () => {
  const [genreData, setGenreData] = useState([]);
  // data is stored:  genreId: genreName
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

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

  const saveSelections = () => {
    console.log('Selected Genres:', selectedGenres);
    // Implement logic to save selections here
  };

  return (
    <ChakraProvider>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}> Select up to 5 Genres </Text>
          <Icon as={show ? ChevronUpIcon : ChevronDownIcon} onClick={toggleShow} />                 
        </Box>
      {show && (
          <> 
            {loading && <Text>Loading genres...</Text>}
            {error && <Text color="red">{error}</Text>}
            {!loading && !error && (
              <Box className="genre-form-container">

                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {genreData.map((genre) => (
                    <GridItem key={genre}>
                      <Box
                        className={`genre-card ${isGenreSelected(genre) ? 'selected' : ''} ${selectedGenres.length >= 5 && !isGenreSelected(genre) ? 'grayed' : ''}`}
                        onClick={() => handleGenreClick(genre)}
                      >
                        <Text>{genre.name}</Text>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
                <Button className="save-button" onClick={saveSelections} isDisabled={selectedGenres.length === 0}>
                  Save Selections
                </Button>
              </Box>)}
          </>
        )}
      </VStack>
    </ChakraProvider>
  );
};

export default GenreSelectionForm;
