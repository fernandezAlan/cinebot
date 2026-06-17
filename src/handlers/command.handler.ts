import { NowPlayingMoviesCommand, RecommendMovieCommand } from "../commands/movie.command.js";
import { PersonCommand } from "../commands/person.command.js";
import { PingCommand } from "../commands/ping.command.js";
import { commandNames } from "../constants/constanst.js";
import { CreditType } from "../constants/person.types.js";
import {NextCommand} from "../commands/next.command.js";
import { SelectOptionCommand } from "../commands/selectOption.command.js";
export async function commandHandler(sock: any, chatId: string, text: string) {
  const command = text.toLowerCase().split(" ")[0].trim();
  switch (command) {
    case commandNames.PING:
      await PingCommand(sock, chatId);
      break;
    case commandNames.RECOMMEND:
      await RecommendMovieCommand(sock, chatId, text);
      break;
    case commandNames.ACTOR:
      await PersonCommand(sock, chatId, text, CreditType.Cast);
      break;
    case commandNames.DIRECTOR:
      await PersonCommand(sock, chatId, text, CreditType.Crew);
      break;
    case commandNames.NOW_PLAYING:
      await NowPlayingMoviesCommand(sock, chatId);
      break;
    case commandNames.NEXT:
      await NextCommand(sock, chatId);
      break;
    case commandNames.SELECT_OPTION:
      const option = Number(text.toLowerCase().split(" ")[1].trim());
      await SelectOptionCommand(sock, chatId, option);
    default:
      break;
  }
}
