export type MoviePreferences = {
  genres?: string[];
  excludeGenres?: string[];
  similarTo?: string[];
  minYear?: number | null;
  actors?: string[];
  cast?:string[]
};

export type ScoredMovie = {
  movie: any;
  score: number;
};
