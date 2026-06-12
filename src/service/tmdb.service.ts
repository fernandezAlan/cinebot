import axios from "axios";
import dotenv from "dotenv";
import { MoviePreferences } from "../constants/movie.types.js";
import { MovieCreditsType } from "../constants/person.types.js";

dotenv.config();

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  },
  params: {
    language: "es-AR",
  },
});

//request
export const getMovie = async () => {
  const res = await tmdbApi.get("/movie/640146");
  return res.data;
};

export async function searchPersonByName(name: string) {
  const response = await tmdbApi.get("/search/person", {
    params: {
      query: name,

      language: "es-AR",
    },
  });
  console.log("searchPersonByName response:", response.data.results);
  return response.data.results[0];
}

export const getSimilarMovie = async (movieiD: string) => {
  const response = await tmdbApi.get(`/movie/${movieiD}/recommendations`);
  return response.data.result;
};

export const discoverMovie = async (preferences: MoviePreferences) => {
  const { genres, excludeGenres, cast,crew } = preferences;
  const response = await tmdbApi.get("/discover/movie", {
    params: {
      include_adult: false,
      sort_by: "vote_average.desc",
      ["vote_count.gte"]: 1000,
      with_genres: genres?.join(","),
      without_genres: excludeGenres?.join(","),
      primary_release_year: preferences.minYear,
      ["vote_average.gte"]: 7,
      language: "es-AR",
      with_cast: cast?.join(","),
      with_crew: crew?.join(","),
    },
  });
  return response.data.results;
};

export async function getMovieCredits(personId: string): Promise<MovieCreditsType> {
   const respose = await tmdbApi.get(`/person/${personId}/movie_credits`)
   console.log("getMovieCredits response:", respose.data.cast.length);
   return respose.data;
}