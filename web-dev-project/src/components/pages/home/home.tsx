import { useState } from "react"
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

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}