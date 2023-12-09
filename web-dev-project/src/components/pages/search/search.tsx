import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import axios from 'axios';
import { Movie } from '../../../types';
import { Box, Image, Text, SimpleGrid, AspectRatio } from "@chakra-ui/react";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreData, setGenreData] = useState([]);

  // Function to update the URL query parameters
  const updateSearchParams = (params: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit) | undefined) => {
    setSearchParams(params);
  };

  // Function to fetch movies based on search criteria
  const fetchMovies = async () => {
    const response = await axios.get(`http://localhost:8081/search/${params}`);
    console.log(response.data);
    setMovies(response.data);
  };

  const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:8081/genres/movies')
        setGenreData(response.data);
        console.log(response)
      } catch (e) {
        console.error('Error fetching genres:', e);
      }
    };

  // Fetch movies when search parameters change
  useEffect(() => {
    if (!params) return;
    fetchMovies();
    fetchGenres();
  }, [params]);

  // Handlers for search input, genre, and sort by changes
  const handleSearchChange = (event) => {
    // updateSearchParams({ ...Object.fromEntries(searchParams.entries()), query: event.target.value });
    setParams(event.target.value);
  };

  const handleGenreChange = (any) => {
    updateSearchParams({ ...Object.fromEntries(searchParams.entries()), genre: any.target.value });
  };

  const handleSortChange = (any) => {
    updateSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: any.target.value });
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
        <FormControl>
          <InputLabel>Genre</InputLabel>
          <Select
            placeholder='All'
            value={searchParams.get('genre') || '      '}
            label="Genre"
            onChange={handleGenreChange}
            style={{ marginRight: 10, width: '100%'}}
          >
            {/*
            <MenuItem value="comedy">Comedy</MenuItem>
            <MenuItem value="drama">Drama</MenuItem>*/}
            {genreData.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
            {/* ... other genres */}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={searchParams.get('sort') || 'name'}
            label="Sort By"
            onChange={handleSortChange}
            style={{ marginRight: 10, marginLeft: 10 }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" onClick={fetchMovies} size="large">
          Search
        </Button>
      </div>
      <br></br>

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
              <Button variant="contained" color="primary">Like</Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}
