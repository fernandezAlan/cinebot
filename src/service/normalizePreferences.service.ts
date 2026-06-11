import { MoviePreferences } from "../constants/movieConstants.js";
import { movieGenres } from "../constants/movieGenres.js";
import { searchActorByName } from "./tmdb.service.js";


/**
 * Convierte las preferencias de película del usuario en un formato que la API de TMDB pueda entender. Esto incluye convertir los nombres de los géneros a sus IDs correspondientes y buscar los IDs de los actores basándose en sus nombres.
 * @param {MoviePreferences} preferences - Las preferencias de película del usuario, incluyendo géneros, géneros a excluir, actores, películas similares y año mínimo de lanzamiento.
 * @returns {Promise<MoviePreferences>} Un objeto de preferencias de película con los géneros convertidos a IDs y los actores convertidos a sus IDs correspondientes.
*/
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
