import { Box, Image, Text, AspectRatio } from "@chakra-ui/react";
import genreIdToName from "../utils/genreIdToName";

interface MovieCardProps {
    title: string;
    image: string;
    genre: string[];
    rating: number;
    num_rating: number;
    date: string;
}

const MovieCard = (movie: MovieCardProps) => {
    return (
        <Box className="movieCard" p={4} shadow="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"
            style={{ backgroundImage: 'linear-gradient(to bottom right, #ffffff, #e6e6e6)' }}
        >
            <AspectRatio ratio={2 / 3} width="100%">
                <Image
                    src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.image}`}
                    alt={movie.title}
                    boxSize="300px"
                    objectFit="cover"
                />
            </AspectRatio>
            <Box p="6">
                <Text mt={2} fontSize="xl" fontWeight="bold" lineHeight="tight" fontFamily={'sans-serif'} isTruncated>
                    {movie.title}
                </Text>
                <Text mt={2} color="gray.500" fontFamily={'sans-serif'}>Genres: {genreIdToName(movie.genre)}</Text>
                <Text color="gray.600" fontFamily={'sans-serif'}>Rating: {movie.rating} ({movie.num_rating} votes)</Text>
                <Text color="gray.600" fontFamily={'sans-serif'}>Release Date: {movie.date}</Text>
            </Box>
        </Box>
    )
}

export default MovieCard