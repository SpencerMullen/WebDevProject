import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { Movie } from '../../../types';

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
    const response = await axios.get(`http://localhost:8081/search/${params}`);
    console.log(response.data);
    setMovies(response.data);
  };

  // Fetch movies when search parameters change
  useEffect(() => {
    if (!params) return;
    fetchMovies();
  }, [params]);

  // Handlers for search input, genre, and sort by changes
  const handleSearchChange = (event) => {
    // updateSearchParams({ ...Object.fromEntries(searchParams.entries()), query: event.target.value });
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
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {movies.map((movie, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.image}`}
              width="200"
              height={300}
              alt={movie.title}
            />
            <h1>{movie.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
