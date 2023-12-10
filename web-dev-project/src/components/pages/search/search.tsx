import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import axios from 'axios';
import { Movie } from '../../../types';
import { Box, Image, Text, SimpleGrid, AspectRatio } from "@chakra-ui/react";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreData, setGenreData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [popularitySort, setPopularitySort] = useState('popularity.desc');
  const [releaseDateSort, setReleaseDateSort] = useState('primary_release_date.desc');

  // Function to fetch movies based on search criteria
  const fetchMovies = async (searchParameters) => {
    const response = await axios.get(`http://localhost:8081/search`, { params: searchParameters });
    console.log(response.data);
    setMovies(response.data);
  };

  // Function to fetch genres
  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:8081/genres/movies')
      setGenreData(response.data);
      console.log(response)
    } catch (e) {
      console.error('Error fetching genres:', e);
    }
  };

  // Fetch genres on component mount
  useEffect(() => {
    fetchGenres();
  }, []);

  // Function to render the selected genre names
  const renderSelectValue = (selected) => {
    if (selected.length === 0) {
      return "Select up to 5 genres";
    }
    // Find genre names based on selected IDs
    const selectedGenreNames = genreData
      .filter(genre => selected.includes(genre.id))
      .map(genre => genre.name);
    return selectedGenreNames.join(', ');
  };

  // Handler for genre change
  const handleGenreChange = (event) => {
    const value = event.target.value;
    const genreIds = typeof value === 'string' ? value.split(',') : value;
    if (genreIds.length <= 5) {
      setSelectedGenres(genreIds);
    }
  };

  // Handler for search input change
  const handleSearchChange = (event) => {
    setParams(event.target.value);
  };

  // Handlers to toggle sort parameters
  const togglePopularitySort = () => {
    setPopularitySort(prev => prev === 'popularity.asc' ? 'popularity.desc' : 'popularity.asc');
  };

  const toggleReleaseDateSort = () => {
    setReleaseDateSort(prev => prev === 'primary_release_date.asc' ? 'primary_release_date.desc' : 'primary_release_date.asc');
  };

  // Combined function to update search params and fetch movies
  const updateAndFetchMovies = async () => {
    const newSearchParams = {
      ...(selectedGenres.length > 0 && { genre: selectedGenres.join(',') }),
      ...(params && { title: params }),
      sort: popularitySort.includes('popularity') ? popularitySort : releaseDateSort,
    };
    setSearchParams(newSearchParams); // Update the search params in the URL
    await fetchMovies(newSearchParams); // Fetch movies with the updated parameters
  };

  // Trigger the update and fetch when the search button is clicked
  const handleSearchButtonClick = () => {
    updateAndFetchMovies();
  };

  return (
    <div>
      <div
        style={{
          marginLeft: 10,
          display: 'flex',
          justifyItems: 'center',
          marginTop: 15,
        }} >

        <TextField
          label="Search by Title"
          variant="outlined"
          value={params}
          onChange={handleSearchChange}
          style={{ marginRight: 10, width: '25%' }}
        />
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
            input={<OutlinedInput label="Genre" />}
            renderValue={renderSelectValue}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
          >
            {genreData.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                <Checkbox checked={selectedGenres.indexOf(genre.id) > -1} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={popularitySort} // or releaseDateSort depending on your UI logic
            onChange={updateSearchParams} // This needs to be adjusted based on your UI logic
          >
            <MenuItem value={popularitySort} onClick={togglePopularitySort}>
              {popularitySort === 'popularity.asc' ? 'Popularity Ascending' : 'Popularity Descending'}
            </MenuItem>
            <MenuItem value={releaseDateSort} onClick={toggleReleaseDateSort}>
              {releaseDateSort === 'primary_release_date.asc' ? 'Date Ascending' : 'Date Descending'}
            </MenuItem>
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" onClick={handleSearchButtonClick} size="large">
          Search
        </Button>
      </div>
      <br></br>

      <SimpleGrid columns={[1, 2, 3, 5]} spacing={10}>
        {movies.map((movie, index) => (
          <Box key={index} p={4} shadow="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <AspectRatio ratio={2 / 3} width="100%">
              <Image
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.image}`}
                alt={movie.title}
                boxSize="300px"
                objectFit="cover" // This makes sure the entire image fits within the box, though it may leave some empty space
              // htmlWidth="110%" // This sets the width relative to the parent element
              // htmlHeight="auto"
              />
            </AspectRatio>
            <Box p="6">
              <Text mt={2} fontSize="xl" fontWeight="bold" lineHeight="tight" isTruncated>
                {movie.title}
              </Text>
              <Text mt={2} color="gray.500">Genre: {movie.genre}</Text>
              <Text color="gray.600">Rating: {movie.vote_average} ({movie.vote_count} votes)</Text>
              <Text color="gray.600">Popularity: {movie.popularity}</Text>
              <Text color="gray.600">Release Date: {movie.release_date}</Text>
              <Button variant="contained" color="primary">Like</Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}
