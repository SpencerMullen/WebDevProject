import { useState, useEffect } from "react"
import axios from "axios"
import { Typography } from "@mui/material";
import { Box, SimpleGrid } from "@chakra-ui/react";
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
            <Box p={5} mt={75}>
            <Typography  variant="h4" // Slightly smaller than h4 for better fit
                color="teal" // Use the primary color from your theme, which you can customize
                sx={{
                    fontFamily: 'Roboto Slab, serif',
                    fontWeight: 700,
                    padding: '8px 16px', // Symmetrical padding
                    margin: '16px 0', // Margin at the top and bottom
                    borderRadius: '8px', // Slightly rounded corners
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Softer shadow for depth
                    backgroundColor: 'beige', // A light background color for contrast
                    display: 'inline-block', // Wrap the background around the text
                    }}>
                        Hi {username}!            
            </Typography>

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