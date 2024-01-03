/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import axios from "axios"
import { Typography } from "@mui/material";
import { Box, SimpleGrid } from "@chakra-ui/react";
import * as client from '../../user/client'
import MovieCard from "../../MovieCard";
import { Movie } from "../../../types";

export default function Home({ loggedIn, username }: { loggedIn: boolean, username: string }) {
    const [movies, setMovies] = useState<Movie[]>([])

    const getMovies = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (loggedIn) {
            const response = await client.getRecommendations();
            setMovies(response)
        } else {
            const response = await axios.get(`${backendUrl}/movies/popular`)
            setMovies(response.data)
        }
    }
    useEffect(() => {
        getMovies();
    }, []);

    const convertGenreIntoList = (genre: string): string[] => {
        if (typeof genre !== 'string') {
            return [];
        }
        const genreList = genre.split(',');
        return genreList;
    }

    return (
        <div>
            <Box p={5} mt={75}>
            <Typography  variant="h4" 
                color="teal" 
                sx={{
                    fontFamily: 'Roboto Slab, serif',
                    fontWeight: 700,
                    padding: '8px 16px',
                    margin: '16px 0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    backgroundColor: 'beige',
                    display: 'inline-block',
                    }}>
                        Hi {username}!            
            </Typography>

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
            </Box>
        </div>
    )
}