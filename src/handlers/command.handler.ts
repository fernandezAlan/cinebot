import {  RecommendMovieCommand } from "../commands/movie.command.js";
import { pingCommand } from "../commands/ping.command.js";

export async function commandHandler(sock: any, chatId: string, text: string) {
  const command = text.toLowerCase().split(" ")[0].trim();
  switch (command) {
    case "!ping":
      await pingCommand(sock, chatId);
      break;
    case "!recomend":
      await RecommendMovieCommand(sock, chatId,text);
      break;
    default:
      break;
  }
}
