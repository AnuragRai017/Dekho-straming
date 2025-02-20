'use client';

import { useState, useEffect, useRef } from 'react';
import { TMDBMovie, TMDBTVShow } from '@/lib/api-config';
import { searchMedia } from '@/lib/api-service';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<(TMDBMovie | TMDBTVShow)[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        try {
          const data = await searchMedia(query);
          setResults(data.results.slice(0, 5));
          setIsOpen(true);
        } catch (error) {
          console.error('Error searching media:', error);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const getItemTitle = (item: TMDBMovie | TMDBTVShow) => {
    return 'title' in item ? item.title : item.name;
  };

  const getItemYear = (item: TMDBMovie | TMDBTVShow) => {
    const date = 'release_date' in item ? item.release_date : item.first_air_date;
    return new Date(date).getFullYear();
  };

  const getItemType = (item: TMDBMovie | TMDBTVShow): 'movie' | 'show' => {
    return 'title' in item ? 'movie' : 'show';
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies & TV shows"
          className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
          {results.map((item) => (
            <a
              key={item.id}
              href={`/${getItemType(item)}/${item.id}`}
              className="block px-4 py-3 hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-14 mr-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={getItemTitle(item)}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <div className="text-white font-medium">{getItemTitle(item)}</div>
                  <div className="text-gray-400 text-sm flex items-center">
                    <span>{getItemYear(item)}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{getItemType(item)}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}