'use client';

import { useEffect, useState } from 'react';
import { TMDBMovie, TMDBTVShow, getTMDBImageUrl } from '@/lib/api-config';
import { getPopularMovies, getPopularTVShows } from '@/lib/api-service';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [shows, setShows] = useState<TMDBTVShow[]>([]);
  const [activeTab, setActiveTab] = useState<'movies' | 'shows'>('movies');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, showsData] = await Promise.all([
          getPopularMovies(),
          getPopularTVShows()
        ]);
        setMovies(moviesData.results);
        setShows(showsData.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const MediaCard = ({ item, type }: { item: TMDBMovie | TMDBTVShow; type: 'movie' | 'show' }) => {
    const title = type === 'movie' ? (item as TMDBMovie).title : (item as TMDBTVShow).name;
    const date = type === 'movie' ? (item as TMDBMovie).release_date : (item as TMDBTVShow).first_air_date;
    const linkUrl = type === 'movie' ? `/movie/${item.id}` : `/show/${item.id}`;

    return (
      <div className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <Link href={linkUrl} className="block relative">
          <div className="relative">
            <Image
              src={getTMDBImageUrl(item.poster_path)}
              alt={title}
              width={300}
              height={450}
              className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
              <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-12 h-12 text-white"
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
                </svg>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-white mb-2 truncate group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
            <p className="text-gray-400 text-sm">{new Date(date).getFullYear()}</p>
            <div className="mt-2 flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-400 ml-1">{item.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Stream Movies & TV Shows</h1>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-6 py-2 rounded-full ${activeTab === 'movies' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab('shows')}
            className={`px-6 py-2 rounded-full ${activeTab === 'shows' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            TV Shows
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {activeTab === 'movies' 
            ? movies.map((movie) => (
                <MediaCard key={movie.id} item={movie} type="movie" />
              ))
            : shows.map((show) => (
                <MediaCard key={show.id} item={show} type="show" />
              ))
          }
        </div>
      </div>
    </main>
  );
}
