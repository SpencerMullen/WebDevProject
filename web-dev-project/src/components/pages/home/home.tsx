import { useState, useEffect } from "react"
import axios from "axios"
import { Box, Image, Text, Button, SimpleGrid, AspectRatio } from "@chakra-ui/react";
import genreIdToName from "../../../utils/genreIdToName";

export default function Home() {

    let loggedIn = true;
    const [users, setUsers] = useState([])
    const [movies, setMovies] = useState([])

    const getUser = async (userId: number) => {
        const response = await axios.get(`http://localhost:8081/users/${userId}`)
        console.log(response.data)
    }

    const getMovies = async () => {

        if (loggedIn) {
            console.log("confirming logged in");
            const response = await axios.get('http://localhost:8081/movies/recommendations')
            console.log(response);
            setMovies(response.data)
        } else {
            const response = await axios.get('http://localhost:8081/movies/popular')
            setMovies(response.data)
        }
    }
    useEffect(() => {
        getMovies();
        console.log(movies);
    }, []); 
    return (
        <div>   
            <Box p={5}>
                <Text fontSize="3xl">Home</Text>
                <Text fontSize="xl">Hi User: ????</Text>

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
                                    {movie.title}ya
                                </Text>
                                <Text mt={2} color="gray.500">Genres: {genreIdToName(movie.genre)}</Text>
                                <Text color="gray.600">Rating: {movie.vote_average} ({movie.vote_count} votes)</Text>
                                <Text color="gray.600">Popularity: {movie.popularity}</Text>
                                <Text color="gray.600">Release Date: {movie.release_date}</Text>
                                <Button mt={4} colorScheme="teal">Like</Button>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </div>
    )
}