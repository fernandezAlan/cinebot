import { commandNames } from "../constants/constanst.js";
import { messageHandler } from "../handlers/messages.handler.js";
import { discoverMovie, getMovieImages } from "../service/tmdb.service.js";
import { random } from "../utils/index.js";
export async function GameCommand(sock, chatId) {
    const page = random(1, 500);
    const movies = await discoverMovie({}, page);
    console.log("movies", movies);
    //movies.sort(() => Math.random() - 0.5);
    const options = movies.slice(0, 3);
    console.log("options", options);
    const correctMovie = options[random(0, 2)];
    const images = await getMovieImages(correctMovie.id);
    const backdrop = images.backdrops[random(0, images.backdrops.length - 1)];
    const message = messageHandler(commandNames.GAME, [], { backdropUrl: backdrop.file_path });
    await sock.sendMessage(chatId, message);
}
