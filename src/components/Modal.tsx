import React, { useEffect, useState, useCallback } from "react";
import BannerSection from "./BannerSection";
import SeriesDetailsSection from "./SeriesDetail";
import EpisodesSection from "./EpisodeSection";
import { fetchCoverMovieData } from "@/lib/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title?: string;
  coverImage?: string;
}

interface Actor {
  name: string;
  url: string;
}

interface MovieDetail {
  years: { year: string }[];
  totalEpisodes: { total: number };
  contentRating: string;
  genre: string[];
  description: string;
  actor: Actor[];
  name: string;
  image?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, id, title, coverImage }) => {
  const [movieBanner, setMovieBanner] = useState({
    coverImage: coverImage ?? "",
    video: "",
    title: title ?? ""
  });

  const [movieDetail, setDetail] = useState<MovieDetail | null>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getCoverMovieData = useCallback(async (movieId: string) => {
    try {
      const response = await fetchCoverMovieData(movieId);
      const data = await response.json();

      setMovieBanner({
        coverImage: data?.detail?.image ?? coverImage ?? "",
        video: data?.video?.[0]?.url ?? "",
        title: data?.detail?.name ?? title ?? ""
      });

      // Set movieDetail to match the expected structure
      setDetail({
        years: [{ year: data?.detail?.year ?? "" }],
        totalEpisodes: { total: data?.totalEpisodes?.total ?? 0 },
        contentRating: data?.detail?.contentRating ?? "N/A",
        genre: data?.detail?.genre ?? [],
        description: data?.detail?.description ?? "",
        actor: data?.detail?.actor ?? [],
        name: data?.detail?.name ?? "",
        image: data?.detail?.image ?? ""
      });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }, [coverImage, title]);

  useEffect(() => {
    if (isOpen) {
      getCoverMovieData(id);
    }
  }, [id, isOpen, getCoverMovieData]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div className="relative mt-10 w-[55vw] h-[95vh] bg-black rounded-lg overflow-y-auto shadow-2xl">
        <BannerSection
          title={movieBanner.title}
          backgroundImage={movieBanner.coverImage}
          video={movieBanner.video}
          onClose={onClose}
        />

        {movieDetail && <SeriesDetailsSection detail={movieDetail} />}
        <EpisodesSection id={id} />
      </div>
    </div>
  );
};

export default Modal;
