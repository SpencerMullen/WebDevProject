import { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {

    const [users, setUsers] = useState([])
    const [movies, setMovies] = useState([])

    const getUsers = async () => {
        console.log('get users')
        const response = await axios.get('http://localhost:8081/users')
        setUsers(response.data)
        console.log(response.data)
    }

    const getUser = async (userId: number) => {
        const response = await axios.get(`http://localhost:8081/users/${userId}`)
        console.log(response.data)
    }

    const getMovies = async () => {
        const response = await axios.get('http://localhost:8081/movies/popular')
        setMovies(response.data)
    }
    useEffect(() => {
        getMovies();
    }, []); 
    return (
        <div>
            <h1>Home</h1>
            <h2> Hi User: ????</h2>

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
    )
}