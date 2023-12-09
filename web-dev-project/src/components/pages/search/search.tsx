import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { Movie } from '../../../types';
import { Box, Image, Text, Button, SimpleGrid, AspectRatio } from "@chakra-ui/react";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  // Function to update the URL query parameters
  const updateSearchParams = (params) => {
    setSearchParams(params);
  };

  // Function to fetch movies based on search criteria
  const fetchMovies = async () => {
    if (!params) return;
    const response = await axios.get(`http://localhost:8081/search/${params}`);
    console.log(response.data);
    setMovies(response.data);
  };

  // Handlers for search input, genre, and sort by changes
  const handleSearchChange = (event) => {
    setParams(event.target.value);
  };

  const handleGenreChange = (event) => {
    updateSearchParams({ ...Object.fromEntries(searchParams.entries()), genre: event.target.value });
  };

  const handleSortChange = (event) => {
    updateSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: event.target.value });
  };

  return (
    <div>
      <TextField
        label="Search by Title"
        variant="outlined"
        value={params}
        onChange={handleSearchChange}
      />
      <FormControl>
        <InputLabel>Genre</InputLabel>
        <Select
          value={searchParams.get('genre') || ''}
          label="Genre"
          onChange={handleGenreChange}
        >
          {/* Map through your genres here */}
          <MenuItem value="comedy">Comedy</MenuItem>
          <MenuItem value="drama">Drama</MenuItem>
          {/* ... other genres */}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={searchParams.get('sort') || 'name'}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={fetchMovies}>Search</Button>

      {/* Display Movies Here */}
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
                                <Button mt={4} colorScheme="teal">Like</Button>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>
    </div>
  );
}
