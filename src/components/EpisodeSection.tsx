import { getMovieEpisodes } from "@/lib/api"
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Episode = {
  name: string;
  duration: string;
  description?: string;
  image?: string;
};

type MovieEpisodesData = {
  title: string;
  season: string;
  totalSeasons: string;
  episodes: Episode[];
};

const parseISODuration = (iso: string = ""): string => {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const [hours = "0", minutes = "0", seconds = "0"] = match;
  const h = parseInt(hours, 10);
  const m = parseInt(minutes, 10);
  const s = parseInt(seconds, 10);

  return [h && `${h}h`, m && `${m}m`, !h && !m && s && `${s}s`]
    .filter(Boolean)
    .join(" ");
};

const EpisodesSection: React.FC<{ id: string }> = ({ id }) => {
  const [movieEpisodes, setMovieEpisodes] = useState<MovieEpisodesData | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodes = await getMovieEpisodes(id)
        setMovieEpisodes(episodes)
      } catch (err) {
        console.error("Failed to fetch episodes:", err)
      }
    }

    if (id) fetchEpisodes()
  }, [id])

  return (
    <div className="px-15 pb-10 text-white mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Episodes</h2>
        {movieEpisodes?.title && <span className="text-xl">{movieEpisodes.title}</span>}
      </div>

      <div className="space-y-4">
        {movieEpisodes?.episodes.map((ep, index) => (
          <div key={ep.name || index} className="flex items-center gap-4">
            <div className="w-40 h-20 bg-gray-500 rounded-md overflow-hidden">
              {ep.image ? (
                <Image
                  src={ep.image}
                  alt={ep.name}
                  width={160}
                  height={80}
                  className="object-cover w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-sm text-gray-200">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{ep.name}</h3>
                <p className="text-sm text-gray-400">
                  {parseISODuration(ep.duration)}
                </p>
              </div>
              <p className="text-sm text-gray-400">{ep.description || "No description"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodesSection;
