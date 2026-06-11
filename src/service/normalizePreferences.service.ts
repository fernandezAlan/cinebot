import { MoviePreferences } from "../constants/movieConstants.js";
import { movieGenres } from "../constants/movieGenres.js";
import { searchActorByName } from "./tmdb.service.js";



export async function normalizePreferences(preferences: MoviePreferences):Promise<MoviePreferences> {
  const genreIds =
    preferences.genres?.map(
      (genre) => movieGenres[genre as keyof typeof movieGenres].toString(),
    ) ?? [];

  const excludeGenreIds =
    preferences.excludeGenres?.map(
      (genre) => movieGenres[genre as keyof typeof movieGenres].toString(),
    ) ?? [];

  const actorIds = await Promise.all(
    (preferences.actors ?? []).map(async (actor) => {
      const result = await searchActorByName(actor);

      return result?.id;
    }),
  );

  return {
    genres:genreIds,

    excludeGenres:excludeGenreIds,

    actors: actorIds.filter(Boolean),

    similarTo:preferences.similarTo,

    minYear: preferences.minYear,
  };
}
