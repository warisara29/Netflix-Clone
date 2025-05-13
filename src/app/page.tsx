'use client'

import Cover from "@/components/Cover"
import PopularMovies from "@/components/PopularMovies"

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden bg-black">
      <main className="flex flex-col flex-1 justify-between items-start">
        <Cover id={"tt15432016"} />
        <PopularMovies />
      </main>
    </div>
  )
}
