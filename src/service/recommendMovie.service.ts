import { MoviePreferences, ScoredMovie } from "../constants/movie.types.js";
import { searchMovieId } from "../utils/movie.utils.js";
import { discoverMovie, getSimilarMovie } from "./tmdb.service.js";
/**
 * Recomienda una película basada en las preferencias del usuario.
 * @param preferences - Las preferencias del usuario.
 * @returns La película recomendada o null si no se encuentra ninguna.
 */
export async function recommendMovie(preferences: MoviePreferences) {
  
  const movies =  await discoverMovie(preferences);
  if (!movies?.length) {
    return null;
  }
  
  const topMovies = movies.slice(0, 10);
  //const randomMovie = topMovies[Math.floor(Math.random() * topMovies.length)];
  return topMovies;
}
