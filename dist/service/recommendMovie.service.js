import { discoverMovie } from "./tmdb.service.js";
/**
 * Recomienda una película basada en las preferencias del usuario.
 * @param preferences - Las preferencias del usuario.
 * @returns La película recomendada o null si no se encuentra ninguna.
 */
export async function recommendMovie(preferences) {
    const movies = await discoverMovie(preferences);
    if (!movies?.length) {
        return null;
    }
    const topMovies = movies.slice(0, 10);
    //const randomMovie = topMovies[Math.floor(Math.random() * topMovies.length)];
    return topMovies;
}
