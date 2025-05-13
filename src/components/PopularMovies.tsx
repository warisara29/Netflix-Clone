import React, { useRef } from 'react'
import MovieCard from './MovieCard'
import { ChevronLeft, ChevronRight } from "lucide-react"

const movies = [
  { imageUrl: '/locke_and_key.svg', id: "tt3007572" },
  { imageUrl: '/jojo.svg', label: 'NEW EPISODES', id: "tt2359704" },
  { imageUrl: '/good_doctor.svg', id: "tt6470478" },
  { imageUrl: '/train_wreck.svg', id: "tt21217912" },
  { imageUrl: '/resident_evil.svg', id: "tt9660182" },
  { imageUrl: '/brooklyn_nine_nine.svg', label: 'NEW EPISODES', id: "tt2467372" },
  { imageUrl: '/viking.svg', id: "tt2306299" },
]

const PopularMovies: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="text-white text-[36px] font-bold mb-4 z-10 relative">
        Popular on Netflix
      </h2>

      {/* Previous Button */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white"
        onClick={() => scroll("left")}
        style={{ zIndex: 20 }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Scrollable movie cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll pb-2 scrollbar-hide w-full min-w-[1200px] scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            imageUrl={movie.imageUrl}
            id={movie.id}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white"
        onClick={() => scroll("right")}
        style={{ zIndex: 20 }}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

export default PopularMovies;
