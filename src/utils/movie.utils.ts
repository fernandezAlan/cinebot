import { tmdbApi } from "../service/tmdb.service.js";

export async function
searchMovieId(
  movieName: string
) {
  const res =
    await tmdbApi.get(
      "/search/movie",
      {
        params: {
          query: movieName
        }
      }
    );

  return res.data.results[0]
    ?.id;
}