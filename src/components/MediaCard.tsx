'use client';

import { TMDBMovie, TMDBTVShow, getTMDBImageUrl } from '@/lib/api-config';
import Link from 'next/link';
import Image from 'next/image';

type MediaCardProps = {
  media: TMDBMovie | TMDBTVShow;
  type: 'movie' | 'tv';
};

export default function MediaCard({ media, type }: MediaCardProps) {
  const title = 'title' in media ? media.title : media.name;
  const date = 'release_date' in media ? media.release_date : media.first_air_date;
  const year = new Date(date).getFullYear();
  const linkPath = type === 'movie' ? `/movie/${media.id}` : `/show/${media.id}`;

  return (
    <Link href={linkPath}>
      <div className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
        {/* Poster Image */}
        <div className="aspect-[2/3] w-full">
          <Image
            src={getTMDBImageUrl(media.poster_path)}
            alt={title}
            width={300}
            height={450}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Overlay with Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 w-full p-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>{year}</span>
              <span>•</span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{media.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
  