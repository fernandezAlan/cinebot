import { MoviePreferences, ScoredMovie } from "../constants/movieConstants.js";
import { searchMovieId } from "../utils/movie.utils.js";
import { discoverMovie, getSimilarMovie } from "./tmdb.service.js";

export async function recommendMovie(preferences: MoviePreferences) {
  let similarMovieId = null;
  let candidateMovies: any[] = [];
  if (preferences.similarTo?.length) {
    similarMovieId = await searchMovieId(preferences.similarTo[0]);
  }
  if (similarMovieId) {
    const similarMovies = await getSimilarMovie(similarMovieId);
    candidateMovies.push(...similarMovies);
  }
  const discoverMovies = await discoverMovie(preferences);

  candidateMovies.push(...discoverMovies);
  //eliminate duplicates
  const uniqueMovies = Array.from(
    new Map(candidateMovies.map((movie) => [movie.id, movie])).values(),
  );

  const scoredMovies: ScoredMovie[] = uniqueMovies.map((movie) => {
    let score = 0;

    // Similar movie
    if (similarMovieId) {
      score += 3;
    }

    // Genres
    const genreMatches = movie.genre_ids.filter((genreId: number) =>
      preferences.genreIds?.includes(genreId),
    ).length;

    score += genreMatches * 2;

    // Actor
    if (preferences.actorIds?.length) {
      score += 2;
    }

    // Good rating
    if (movie.vote_average >= 7) {
      score += 1;
    }

    // Popular
    if (movie.vote_count > 1000) {
      score += 1;
    }

    return {
      movie,
      score,
    };
  });
  /*
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
  */
}
