// MovieCard Component
import Image from "next/image"
import React, { useEffect, useState } from "react"
import Modal from "./Modal"
import { fetchCoverMovieData} from "@/lib/api"

interface MovieCardProps {
  imageUrl: string
  id: string
}

const MovieCard: React.FC<MovieCardProps> = ({ imageUrl, id }) => {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const [coverImage, setCoverImage] = useState("")

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
  }

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetchCoverMovieData(id)
        const data = await response.json()
        setTitle(decodeHtml(data?.detail?.name) ?? "")
        setCoverImage(data?.detail?.image ?? imageUrl)
      } catch (error) {
        console.error("Failed to fetch movie data:", error)
      }
    }

    fetchMovieData()
  }, [id, imageUrl])

  const handleMoreInfoClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <div
        onClick={handleMoreInfoClick}
        className="relative w-[389px] h-[219px] flex-shrink-0 rounded overflow-hidden hover:scale-105 transition-transform cursor-pointer"
      >
        <Image
          src={imageUrl}
          alt="movie"
          fill
          className="object-cover rounded"
          priority
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        id={id}
        title={title}
        coverImage={coverImage}
      />
    </>
  )
}

export default MovieCard;
