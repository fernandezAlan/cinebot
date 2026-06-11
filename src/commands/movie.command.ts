import { MoviePreferences } from "../constants/movieConstants.js";
import { parseMoviePreferences } from "../service/ai.service.js";
import { normalizePreferences } from "../service/normalizePreferences.service.js";
import { recommendMovie } from "../service/recommendMovie.service.js";
import { getMovie } from "../service/tmdb.service.js";
/*
export async function MovieCommand(sock: any, chatId: string) {
  const movie = await getMovie();
  
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  await sock.sendMessage(chatId, {
    image: {
      url: posterUrl,
    },
    
    caption: `
    🎬 *${movie.title}*
    (${movie.original_title})
    
    ⭐ ${movie.vote_average}
    
    📝 ${movie.overview}
    `.trim(),
  });
}
*/

export async function RecommendMovieCommand(
  sock: any,
  chatId: string,
  text: string,
) {
  const preferences:MoviePreferences = await parseMoviePreferences(text);

  //console.log(preferences);
  const resolvedPref:MoviePreferences = await normalizePreferences(preferences);

  const movie: any = await recommendMovie(resolvedPref);

  if (!movie) {
    await sock.sendMessage(chatId, {
      text: "No encontré una buena recomendación 😢",
    });

    return;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  await sock.sendMessage(chatId, {
    image: {
      url: posterUrl,
    },

    caption: `
🎬 *${movie.title}*

⭐ ${movie.vote_average}

📝 ${movie.overview}
    `.trim(),
  });
}
