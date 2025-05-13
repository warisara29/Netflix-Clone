import React from "react";
import Image from "next/image";

interface Actor {
  name: string;
  url: string;
}

interface Detail {
  years: { year: string }[];
  totalEpisodes: { total: number };
  contentRating: string;
  genre: string[];
  description: string;
  actor: Actor[];
}

interface DetailSectionProps {
  detail: Detail;
}

const SeriesDetailsSection: React.FC<DetailSectionProps> = ({ detail }) => {
  const convertContentRatingToAge = (rating: string): string => {
    const ratingMap: Record<string, string> = {
      'TV-Y': '3+',
      'TV-Y7': '7+',
      'TV-G': '6+',
      'TV-PG': '10+',
      'TV-14': '14+',
      'TV-MA': '16+',
    };
    return ratingMap[rating] || 'N/A';
  };

  return (
    <div className="flex px-15 pt-6 pb-6 text-white gap-10">
      {/* Left: Content */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-sm text-gray-300">
          <div className="flex items-center gap-4 text-[18px] text-white/75">
            <span>{detail?.years[0]?.year}</span>
            <span>{detail?.totalEpisodes?.total} Episodes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0 border border-white text-white text-sm">
              {convertContentRatingToAge(detail?.contentRating)}
            </span>
            <span>{detail?.genre.join(', ')}</span>
          </div>
        </div>

        <p className="flex items-center text-[20px] font-bold max-w-2xl">
          <Image alt="top 10" src="/top10.svg" width={30} height={35} priority />
          <span className="ml-2">#1 in TV Shows Today</span>
        </p>

        <p className="text-md mb-3 leading-relaxed">
          {detail?.description}
        </p>
      </div>

      {/* Right: Cast & Genre */}
      <div className="w-60 space-y-1 text-sm text-gray-400 flex flex-col gap-4">
        <p>
          <strong>Cast:</strong>{' '}
          {detail?.actor.slice(0, 3).map((actor: Actor, index: number) => (
            <span key={actor.url}>
              {actor.name}
              {index < 2 ? ', ' : ''}
            </span>
          ))}
          {detail?.actor.length > 3 && <i>more</i>}
        </p>
        <p>
          <strong>Genres:</strong> {detail?.genre.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default SeriesDetailsSection;
