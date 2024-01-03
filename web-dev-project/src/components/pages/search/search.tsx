/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { Movie } from '../../../types';
import { SimpleGrid } from "@chakra-ui/react";
import './search.css';
import MovieCard from '../../MovieCard';
import { Genre } from '../../../types';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreData, setGenreData] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sort, setSort] = useState('');

  const fetchMovies = async () => {
    const response = await axios.get(`http://localhost:8081/movies/search`, { params: searchParams });
    console.log(response.data);
    setMovies(response.data);
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:8081/movies/genres')
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

  const renderSelectValue = (selected: number[]) => {
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
  const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setParams(event.target.value);

  };
  const convertGenreIntoList = (genre: string): string[] => {
    if (typeof genre !== 'string') {
        return [];
    }
    const genreList = genre.split(',');
    return genreList;
}


  const handleGenreChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    const genreIds = typeof value === 'string' ? value.split(',') : value;
    if (genreIds.length <= 5) {
      setSelectedGenres(genreIds);
    }
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
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
        <Button
          variant="contained"
          size="large"
          onClick={handleSearchButtonClick}
          sx={{
            backgroundColor: 'teal', // Use the teal color for the button background
            '&:hover': {
              backgroundColor: 'darken(teal, 0.2)', // Optionally darken the button on hover
            },
          }}
          >
          Search
        </Button>
      </div>
      <br></br>

      <SimpleGrid columns={[1, 2, 3, 5]} spacing={10}>
        {movies.map((movie, index) => (
          <MovieCard key={index}
            title={movie.title}
            image={movie.image}
            genre={convertGenreIntoList(String(movie.genre))}
            rating={movie.rating}
            num_rating={movie.num_rating}
            date={movie.date}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
