import { MoviePreferences, ScoredMovie } from "../constants/movieConstants.js";
import { searchMovieId } from "../utils/movie.utils.js";
import { discoverMovie, getSimilarMovie } from "./tmdb.service.js";

export async function recommendMovie(preferences: MoviePreferences) {
  
  const movies = similarMovieId
  ? await getSimilarMovie(similarMovieId)
  : await discoverMovie(preferences);
  
  if (!movies.length) {
    return null;
  }
  
  const topMovies = movies.slice(0, 10);
  topMovies.forEach((element: { title: any }) => {
    console.log("nombre:", element.title);
  });
  const randomMovie = topMovies[Math.floor(Math.random() * topMovies.length)];
  
  return randomMovie;
  
}
