import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  // Function to update the URL query parameters
  const updateSearchParams = (params) => {
    setSearchParams(params);
  };

  // Function to fetch movies based on search criteria
  const fetchMovies = async () => {
    const query = searchParams.get('query') || '';
    const genre = searchParams.get('genre') || '';
    const sortBy = searchParams.get('sort') || 'name';

    // Replace with actual API call to fetch movies
    // Apply search, filter, and sorting logic in the API or here after fetching
  };

  // Fetch movies when search parameters change
  useEffect(() => {
    fetchMovies();
  }, [searchParams]);

  // Handlers for search input, genre, and sort by changes
  const handleSearchChange = (event) => {
    updateSearchParams({ ...Object.fromEntries(searchParams.entries()), query: event.target.value });
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
        value={searchParams.get('query') || ''}
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
      {movies.map((movie, index) => (
        <div key={index}>
          {/* Movie details */}
        </div>
      ))}
    </div>
  );
}
