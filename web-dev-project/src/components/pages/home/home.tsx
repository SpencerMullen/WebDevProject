import { useState, useEffect } from "react"
import axios from "axios"
import { Typography, Container } from "@mui/material";
import { Box, Image, Text, SimpleGrid, AspectRatio } from "@chakra-ui/react";
import genreIdToName from "../../../utils/genreIdToName";
import * as client from '../../user/client'
import MovieCard from "../../MovieCard";

export default function Home({ loggedIn, username }: { loggedIn: boolean, username: string }) {

    const [movies, setMovies] = useState([])

    const getMovies = async () => {

        if (loggedIn) {
            const response = await client.getRecommendations();
            setMovies(response)
        } else {
            const response = await axios.get('http://localhost:8081/movies/popular')
            setMovies(response.data)
        }
    }
    useEffect(() => {
        getMovies();
    }, []);


    return (
        <div>
            <Box p={5}>
                <Text fontSize="3xl">Hi User: {username}</Text>

                <SimpleGrid columns={[1, 2, 3, 5]} spacing={10}>
                    {movies.map((movie, index) => (
                        console.log(movie),
                        <MovieCard key={index}
                            title={movie.title}
                            image={movie.image}
                            genre={movie.genre}
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