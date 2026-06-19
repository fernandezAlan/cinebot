import { commandNames } from "../constants/constanst.js";
export function messageHandler(command, results, gameoptions) {
    let message = {};
    let posterUrl = "";
    switch (command) {
        case commandNames.PING:
            console.log("PING COMMAND");
            break;
        case commandNames.RECOMMEND:
            posterUrl = `https://image.tmdb.org/t/p/w500${results[0].poster_path}`;
            message = {
                image: {
                    url: posterUrl,
                },
                caption: `
     🎬 *${results[0].title}*
     
     ⭐ ${results[0].vote_average}
     
     📝 ${results[0].overview}

     puedes usar el comando ${commandNames.NEXT} para ver la siguiente recomendación
         `.trim(),
            };
            break;
        case commandNames.ACTOR:
            console.log("ACTOR COMMAND");
            break;
        case commandNames.DIRECTOR:
            console.log("DIRECTOR COMMAND");
            break;
        case commandNames.SELECT_OPTION:
            posterUrl = `https://image.tmdb.org/t/p/w500${results[0].poster_path}`;
            message = {
                image: {
                    url: posterUrl,
                },
                caption: `
     🎬 *${results[0].title}*
     
     ⭐ ${results[0].vote_average}
     
     📝 ${results[0].overview}
         `.trim(),
            };
            break;
        case commandNames.NOW_PLAYING:
            console.log("NOW PLAYING COMMAND");
            const text = "🍿 Películas en cartelera\n\n" +
                results
                    .map((movie, index) => `${index + 1}. ${movie.title} ⭐ ${movie.vote_average}`)
                    .join("\n") +
                `\nPuedes usar el comando ${commandNames.NEXT} para ver la siguiente página de resultados`;
            message = { text };
            break;
        case commandNames.GAME:
            posterUrl = `https://image.tmdb.org/t/p/w500${gameoptions.backdropUrl}`;
            message = {
                image: {
                    url: posterUrl,
                },
            };
            break;
    }
    return message;
}
