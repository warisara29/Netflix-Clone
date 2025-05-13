// components/BannerSection.tsx
import { Plus, ThumbsUp, X } from "lucide-react";
import Image from "next/image"

interface BannerSectionProps {
  title: string;
  backgroundImage: string;
  onClose: () => void;
  video: string
}

const BannerSection: React.FC<BannerSectionProps> = ({ title, backgroundImage, onClose, video }) => {
  return (
    <div className="relative h-[450px] bg-black bg-no-repeat bg-top bg-cover overflow-hidden">
      {/* 👇 วิดีโออยู่ด้านหลัง */}
      {video ? (
        <video
          src={video}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          playsInline
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-top bg-cover z-0"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      )}

      {/* 👇 Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />

      {/* 👇 Content */}
      <div className="absolute px-8 bottom-10 left-6 right-6 flex flex-col gap-6 z-20">
        <Image
          alt="original logo"
          src="/N_Series_Originals.svg"
          width={257 / 3}
          height={64 / 3}
          priority
          className="transition-all duration-300"
        />
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">{title}</h1>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <button className="bg-white text-black px-6 py-2 rounded flex items-center gap-2">
              ▶ Play
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border border-white text-white hover:bg-white/10 transition">
              <Plus size={25} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border border-white text-white hover:bg-white/10 transition">
              <ThumbsUp size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 👇 Close button */}
      <button className="absolute top-4 right-4 text-white cursor-pointer z-20" onClick={onClose}>
        <X size={30} />
      </button>
    </div>
  )
}

export default BannerSection;
