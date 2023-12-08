import { Box, Button, ChakraProvider, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GenreSelectionForm.css';
import  getGenreOptions from '../../../../../backend/movie/Genre/getGenreOptions'

const GenreSelectionForm: React.FC = () => {
  const [genreData, setGenreData] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // const response = ["genre 1", "genre 2", "genre 3", "genre 4", "genre 5", "genre 6", "genre 7", "genre 8"];
        // setGenreData(response);
        const response = await getGenreOptions();
        setGenreData(response);
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
        {loading && <Text>Loading genres...</Text>}
        {error && <Text color="red">{error}</Text>}
        {!loading && !error && (
          <Box className="genre-form-container">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Select up to 5 Genres
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {genreData.map((genre) => (
                <GridItem key={genre}>
                  <Box
                    className={`genre-card ${isGenreSelected(genre) ? 'selected' : ''} ${selectedGenres.length >= 5 && !isGenreSelected(genre) ? 'grayed' : ''}`}
                    onClick={() => handleGenreClick(genre)}
                  >
                    <Text>{genre}</Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
            <Button className="save-button" onClick={saveSelections} isDisabled={selectedGenres.length === 0}>
              Save Selections
            </Button>
          </Box>
        )}
      </VStack>
    </ChakraProvider>
  );
};

export default GenreSelectionForm;
