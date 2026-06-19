import { commandNames } from "../constants/constanst.js";
import { messageHandler } from "../handlers/messages.handler.js";
import { discoverMovie, getMovieImages } from "../service/tmdb.service.js";
import { random } from "../utils/index.js";

export async function GameCommand(sock: any, chatId: string) {
  const page = random(10, 50);
  const movies = await discoverMovie({});

  //movies.sort(() => Math.random() - 0.5);

  //const options = movies.slice(0, 3);
  //console.log("options", options);
  const correctMovie = movies[random(0, movies.length - 1)];
console.log("correctMovie", correctMovie);
  const images = await getMovieImages(correctMovie.id);
  console.log("images", images);
  const backdrop = images.backdrops[random(0, images.backdrops.length - 1)];
  const message = messageHandler(commandNames.GAME, [], {backdropUrl: backdrop.file_path});
  await sock.sendMessage(chatId, message);
}
