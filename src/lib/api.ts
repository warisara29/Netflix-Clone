// lib/api.ts
export const getMovieById = async (id: string) => {
  const response = await fetch(`http://localhost:4000/movies/search?tt=${id}`)
  if (!response.ok) throw new Error("Failed to fetch movie data")
  const data = await response.json()
  return data
}

export const getMovieEpisodes = async (movieId: string, season = 1) => {
  const res = await fetch(`http://localhost:4000/movies/episodes?tt=${movieId}&season=${season}`)
  if (!res.ok) throw new Error("Failed to fetch episodes")
  const data = await res.json()
  return data
}

export const fetchCoverMovieData = async (movieId: string) => {
  try {
    const res = await fetch(`http://localhost:4000/movies/data?tt=${movieId}`)
    if (!res.ok) throw new Error("Failed to fetch cover movie data")
    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching cover movie data:", error)
    throw error
  }
}
