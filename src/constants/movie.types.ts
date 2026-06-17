import { Department } from "./person.types.js";

export type MoviePreferences = {
  genres?: string[];
  excludeGenres?: string[];
  similarTo?: string[];
  minYear?: number | null;
  cast?: string[];
  crew?: string[];
};
export type MovieResult ={
      "adult": boolean,
      "backdrop_path": string | null,
      "genre_ids": number[],
      "id": number,
      "original_language": string,
      "original_title": string,
      "overview": string,
      "popularity": number,
      "poster_path": string,
      "release_date": string,
      "title": string,
      "video": false,
      "vote_average": number,
      "vote_count": number
    }

export const movieGenres = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  science_fiction: 878,
  thriller: 53,
  war: 10752,
} as const;

export type ScoredMovie = {
  movie: any;
  score: number;
};

