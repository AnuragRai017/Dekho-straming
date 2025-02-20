import { TMDB_API_READ_TOKEN, TMDB_BASE_URL, VIDSRC_BASE_URL, TMDBMovie, TMDBTVShow, VidsrcLatestItem } from './api-config';

// TMDB API Service
export const tmdbFetch = async (endpoint: string, params: Record<string, string> = {}) => {
  const queryParams = new URLSearchParams(params);
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${TMDB_API_READ_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export async function getPopularMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function getPopularTVShows() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch TV shows");
  return res.json();
}


export const searchMedia = async (query: string, page: number = 1): Promise<{ results: (TMDBMovie | TMDBTVShow)[] }> => {
  return tmdbFetch('/search/multi', { query, page: page.toString() });
};

// Vidsrc API Service
export const getLatestMovies = async (type: 'new' | 'add' = 'new', page: number = 1): Promise<VidsrcLatestItem[]> => {
  const response = await fetch(`${VIDSRC_BASE_URL}/vapi/movie/${type}/${page}`);
  return response.json();
};

export const getLatestTVShows = async (type: 'new' | 'add' = 'new', page: number = 1): Promise<VidsrcLatestItem[]> => {
  const response = await fetch(`${VIDSRC_BASE_URL}/vapi/tv/${type}/${page}`);
  return response.json();
};

export const getLatestEpisodes = async (page: number = 1): Promise<VidsrcLatestItem[]> => {
  const response = await fetch(`${VIDSRC_BASE_URL}/vapi/episode/latest/${page}`);
  return response.json();
};