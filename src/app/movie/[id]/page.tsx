'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { TMDBMovie, getTMDBImageUrl, getVidsrcMovieUrl } from '@/lib/api-config';
import Image from 'next/image';
import { tmdbFetch } from '@/lib/api-service';

export default function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [movie, setMovie] = useState<TMDBMovie | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await tmdbFetch(`/movie/${resolvedParams.id}`);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [resolvedParams.id]);

  if (!movie) {
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
            src={getTMDBImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
            <div className="flex items-center space-x-4 text-gray-300 mb-4">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>•</span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-gray-300 text-lg max-w-3xl">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-8">
        {isPlaying ? (
          <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={getVidsrcMovieUrl(movie.id)}
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