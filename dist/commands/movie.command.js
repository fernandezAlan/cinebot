import { commandNames } from "../constants/constanst.js";
import { messageHandler } from "../handlers/messages.handler.js";
import { parseMoviePreferences } from "../service/ai.service.js";
import { normalizePreferences } from "../service/normalizePreferences.service.js";
import { recommendMovie } from "../service/recommendMovie.service.js";
import { getNowPlayingMovies } from "../service/tmdb.service.js";
import { searchSessions } from "../store/search-session.store.js";
export async function RecommendMovieCommand(sock, chatId, text) {
    const preferences = await parseMoviePreferences(text);
    const resolvedPref = await normalizePreferences(preferences);
    const movies = await recommendMovie(resolvedPref);
    if (!movies || movies.length === 0) {
        await sock.sendMessage(chatId, {
            text: "No encontré una buena recomendación 😢",
        });
        return;
    }
    searchSessions.set(chatId, {
        command: commandNames.RECOMMEND,
        results: movies,
        currentPage: 0,
    });
    const message = messageHandler(commandNames.RECOMMEND, movies);
    await sock.sendMessage(chatId, message);
}
export async function NowPlayingMoviesCommand(sock, chatId) {
    const movies = await getNowPlayingMovies();
    if (!movies || movies.length === 0) {
        await sock.sendMessage(chatId, {
            text: "No encontré películas en cartelera 😢",
        });
        return;
    }
    //save search session
    searchSessions.set(chatId, {
        command: commandNames.NOW_PLAYING,
        results: movies,
        currentPage: 0,
    });
    //sort movies by vote_average
    movies.sort((a, b) => b.vote_average - a.vote_average);
    const topMovies = movies.slice(0, 10);
    const message = messageHandler(commandNames.NOW_PLAYING, topMovies);
    await sock.sendMessage(chatId, message);
}
