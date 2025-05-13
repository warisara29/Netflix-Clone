'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Info } from "lucide-react"
import Modal from "./Modal"
import { getMovieById } from "@/lib/api"

interface CoverProps {
  id: string
}

export interface CoverMovie {
  video: { url: string }[]
  plot?: { value: string }
}

const Cover: React.FC<CoverProps> = ({ id }) => {
  const [coverMovie, setCoverMovie] = useState<CoverMovie | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieById(id) // 👈 เรียกจาก lib/api.ts
        setCoverMovie(data)
        setIsVideoPlaying(true)
      } catch (error) {
        console.error("Error fetching movie:", error)
      }
    }

    fetchData()
  }, [id])


  const handleMoreInfoClick = () => {
    setShowModal(true)
    videoRef.current?.pause()
  }

  const isFallback = !coverMovie || !coverMovie.video || showModal

  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden mt-[-60px] sm:mt-[-40px] md:mt-[-20px] lg:mt-[-45px]">
        {isFallback || !isVideoPlaying ? (
          <Image
            src="/Main_Show_BG.svg"
            alt="Background"
            fill
            className="object-cover brightness-75"
            priority
          />
        ) : (
          <video
            ref={videoRef}
            width="100%"
            muted
            autoPlay
            playsInline
            onMouseEnter={() => videoRef.current?.play()}
          >
            <source src={coverMovie.video[0]?.url} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative space-y-4 w-fit pb-30 text-white">
        <Image
          alt="original logo"
          src="/N_Series_Originals.svg"
          width={coverMovie ? 129 : 257}
          height={coverMovie ? 32 : 64}
          priority
          className="transition-all duration-300"
        />
        <Image
          alt="show logo"
          src="/Show_Logo.svg"
          width={coverMovie ? 439 : 878}
          height={coverMovie ? 120 : 240}
          priority
          className="transition-all duration-300"
        />

        {!coverMovie && (
          <p className="flex items-center text-[43px] font-bold max-w-2xl">
            <Image alt="top 10" src="/top10.svg" width={44} height={44} priority />
            <span className="ml-2">#1 in TV Shows Today</span>
          </p>
        )}

        {coverMovie?.plot?.value ? (
          <p className="text-lg max-w-2xl">{coverMovie.plot.value}</p>
        ) : (
          <div className="space-y-2">
            <div className="w-full h-2 bg-gray-300 rounded animate-pulse" />
            <div className="w-3/4 h-2 bg-gray-300 rounded animate-pulse" />
          </div>
        )}

        <div className="w-full flex flex-col sm:flex-row gap-4">
          <button className="w-full cursor-pointer sm:w-auto bg-white text-black px-6 sm:px-10 h-[48px] sm:h-[50px] text-base sm:text-[20px] rounded font-semibold hover:bg-gray-300 flex items-center justify-center gap-2">
            ▶ Play
          </button>
          <button
            onClick={handleMoreInfoClick}
            className="w-full cursor-pointer sm:w-auto bg-gray-700 text-white px-6 sm:px-10 h-[48px] sm:h-[50px] text-base sm:text-[20px] min-w-[211px] rounded font-semibold hover:bg-gray-600 flex items-center justify-center gap-2"
          >
            <Info className="w-5 sm:w-7 h-5 sm:h-7" />
            More Info
          </button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} id={id} />
    </>
  )
}

export default Cover
