import { commandNames } from "../constants/constanst.js";
import { messageHandler } from "../handlers/messages.handler.js";
import { searchSessions } from "../store/search-session.store.js";
import { getPage } from "../utils/movie.utils.js";

export async function SelectOptionCommand(
  sock: any,
  chatId: string,
  option: number,
) {
  const session = searchSessions.get(chatId);
  if (!session) {
    await sock.sendMessage(chatId, {
      text: "No hay una búsqueda activa.",
    });
    return;
  }
  const pageResults = getPage(session.results, session.currentPage);
  const selectedOption = pageResults[option - 1];
  if (!selectedOption) {
    await sock.sendMessage(chatId, {
      text: "Opción no válida.",
    });
    return;
  }
  const message = messageHandler(commandNames.SELECT_OPTION, [selectedOption]);
  await sock.sendMessage(chatId, message);
}
