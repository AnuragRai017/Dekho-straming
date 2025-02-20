'use client';

import { useEffect, useState } from 'react';
import { TMDBTVShow, getTMDBImageUrl, getVidsrcTVUrl } from '@/lib/api-config';
import { tmdbFetch } from '@/lib/api-service';
import Image from 'next/image';

type PageProps = {
  params: {
    id: string;
  };
};

export default function ShowDetails({ params }: PageProps) {
  const [show, setShow] = useState<TMDBTVShow | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await tmdbFetch(`/tv/${params.id}`);
        setShow(data);
      } catch (error) {
        console.error('Error fetching show:', error);
      }
    };

    fetchShow();
  }, [params.id]);

  if (!show) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src={getTMDBImageUrl(show.backdrop_path || show.poster_path, 'original')}
            alt={show.name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">{show.name}</h1>
            <div className="flex items-center space-x-4 text-gray-300 mb-4">
              <span>{new Date(show.first_air_date).getFullYear()}</span>
              <span>•</span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{show.vote_average.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-gray-300 text-lg max-w-3xl">{show.overview}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-6 flex space-x-4">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            {Array.from({ length: show.number_of_seasons }, (_, i) => i + 1).map((season) => (
              <option key={season} value={season}>
                Season {season}
              </option>
            ))}
          </select>
          <select
            value={selectedEpisode}
            onChange={(e) => setSelectedEpisode(Number(e.target.value))}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((episode) => (
              <option key={episode} value={episode}>
                Episode {episode}
              </option>
            ))}
          </select>
        </div>

        {isPlaying ? (
          <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={getVidsrcTVUrl(show.id, selectedSeason, selectedEpisode)}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl flex items-center space-x-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Play Now</span>
          </button>
        )}
      </div>
    </div>
  );
}