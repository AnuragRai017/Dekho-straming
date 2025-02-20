// API Configuration and Types

export const TMDB_API_KEY = '86b5fa9795ae2cad95d1ed2d0c3bae59';
export const TMDB_API_READ_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmI1ZmE5Nzk1YWUyY2FkOTVkMWVkMmQwYzNiYWU1OSIsIm5iZiI6MTczOTUwNzI0Ny40NjEsInN1YiI6IjY3YWVjNjJmZjI2OGFiNTc4ZWJhZTQ1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fIBpc21sXxhMMolmWMmhsfdVdpbSoaOalw5yY0_hYms';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const VIDSRC_BASE_URL = 'https://vidsrc.to';

// TMDB API Types
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export interface TMDBEpisode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
  episode_number: number;
  season_number: number;
}

// Vidsrc API Types
export interface VidsrcLatestItem {
  id: string;
  title: string;
  year: string;
  type: 'movie' | 'tv';
}

export interface VidsrcSubtitle {
  file: string;
  label: string;
  kind: 'captions';
}

// API Helper Functions
export const getTMDBImageUrl = (path: string, size: string = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getVidsrcMovieUrl = (id: string | number) => {
  const formattedId = typeof id === 'number' ? id : id.startsWith('tt') ? id : `tt${id}`;
  return `${VIDSRC_BASE_URL}/embed/movie/${formattedId}`;
};

export const getVidsrcTVUrl = (id: string | number, season?: number, episode?: number) => {
  const formattedId = typeof id === 'number' ? id : id.startsWith('tt') ? id : `tt${id}`;
  let url = `${VIDSRC_BASE_URL}/embed/tv/${formattedId}`;
  if (season) {
    url += `/${season}`;
    if (episode) {
      url += `/${episode}`;
    }
  }
  return url;
};