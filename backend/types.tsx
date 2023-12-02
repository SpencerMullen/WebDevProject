export type Movie = {
    id: number
    title: string
    description: string
    year: number
    rating: number
    genre: string[]
    director: string
    cast: string[]
    runtime: number
    image: string
    created: string
    updated: string
}

export type Show = {
    id: number
    title: string
    description: string
    year: number
    rating: number
    genre: string[]
    creator: string
    cast: string[]
    seasons: number
    episodes: number
    image: string
    created: string
    updated: string
}

export type User = {
    id: number
    username: string
    password: string
    email: string
    role: string
    created: string
    updated: string
    movies: Movie[]
    shows: Show[]
}