export enum CreditType {
  Cast = "cast",
  Crew = "crew",
}

export enum Department {
  Acting = "Acting",
  Directing = "Directing",
  Writing = "Writing",
}

export type MovieCredits = {
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
export type MovieCreditsType = {
  cast: MovieCredits[];
  crew: MovieCredits[];
};