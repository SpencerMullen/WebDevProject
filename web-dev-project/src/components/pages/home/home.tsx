import { useState, useEffect } from "react"
import axios from "axios"
import { Box, Image, Text, SimpleGrid, AspectRatio } from "@chakra-ui/react";
import genreIdToName from "../../../utils/genreIdToName";
import * as client from '../../user/client'

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
            </Box>
        </div>
    )
}