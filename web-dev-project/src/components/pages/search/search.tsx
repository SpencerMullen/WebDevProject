import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, ListItemText, OutlinedInput, Typography } from '@mui/material';
import axios from 'axios';
import { Movie } from '../../../types';
import { Box, Image, Text, SimpleGrid, AspectRatio } from "@chakra-ui/react";
import genreIdToName from "../../../utils/genreIdToName";
import './search.css';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreData, setGenreData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sort, setSort] = useState('');

  const fetchMovies = async () => {
    const response = await axios.get(`http://localhost:8081/search`, { params: searchParams });
    console.log(response.data);
    setMovies(response.data);
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:8081/genres/movies')
      setGenreData(response.data);
    } catch (e) {
      console.error('Error fetching genres:', e);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const newSearchParams = {
      ...(selectedGenres.length > 0 && { genre: selectedGenres.join(',') }),
      ...(params && { title: params }),
      sort,
    };
    setSearchParams(newSearchParams);
  }, [selectedGenres, params, sort]); 

  const renderSelectValue = (selected) => {
    if (selected.length === 0) {
      return "Select up to 5 genres";
    }
    // Find genre names based on selected IDs
    const selectedGenreNames = genreData
      .filter(genre => selected.includes(genre.id))
      .map(genre => genre.name);
    return selectedGenreNames.join(', ');
  }
  // Handlers for search input, genre, and sort by changes
  const handleSearchChange = (event) => {
    setParams(event.target.value);

  };

  const handleGenreChange = (event) => {
    const value = event.target.value;
    const genreIds = typeof value === 'string' ? value.split(',') : value;
    if (genreIds.length <= 5) {
      setSelectedGenres(genreIds);
    }
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };


  const handleSearchButtonClick = () => {
    fetchMovies();
    handleClearSearch();
  };

  const handleClearSearch = () => {
    setParams('');
  }

  return (
    <div>
      {/* <Typography variant="subtitle1" style={{ marginLeft: 10, marginTop: 10 }}>
        Search movies by title, or discover new ones by selecting genres and sorting options.
      </Typography> */}
      <div className="instructions-container">
        <p className="instructions-heading">How to Search</p>
        <p className="instructions-text">
          Search movies by title, OR discover new ones by selecting genres and sorting options.
        </p>
      </div>
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
  value={sort}
  onChange={(e) => {
    handleSortChange(e);
  }}
>
  <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
  <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
  <MenuItem value="primary_release_date.desc">Release Date Descending</MenuItem>
  <MenuItem value="primary_release_date.asc">Release Date Ascending</MenuItem>
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
              <Text mt={2} color="gray.500">Genres: {genreIdToName(movie.genre)}</Text>
              <Text color="gray.600">Rating: {movie.rating} ({movie.num_rating} votes)</Text>
              <Text color="gray.600">Release Date: {movie.date}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}
