import { RecommendMovieCommand } from "../commands/movie.command.js";
import { personCommand } from "../commands/personCommand.js";
import { pingCommand } from "../commands/ping.command.js";
import { CreditType } from "../constants/person.types.js";

export async function commandHandler(sock: any, chatId: string, text: string) {
  const command = text.toLowerCase().split(" ")[0].trim();
  switch (command) {
    case "!ping":
      await pingCommand(sock, chatId);
      break;
    case "!recomend":
      await RecommendMovieCommand(sock, chatId, text);
      break;
    case "!actor":
      await personCommand(sock, chatId, text, CreditType.Cast);
      break;
    case "!director":
      await personCommand(sock, chatId, text, CreditType.Crew);
      break;
    default:
      break;
  }
}
