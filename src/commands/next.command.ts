import { messageHandler } from "../handlers/messages.handler.js";
import { searchSessions } from "../store/search-session.store.js";
import { getPage } from "../utils/movie.utils.js";

export async function
NextCommand(
  sock: any,
  chatId: string
) {
  const session =
    searchSessions.get(
      chatId
    );

  if (!session) {
    await sock.sendMessage(
      chatId,
      {
        text:
          "No hay una búsqueda activa."
      }
    );

    return;
  }

  session.currentPage++;

  const pageResults =
    getPage(
      session.results,
      session.currentPage
    );

  if (
    pageResults.length === 0
  ) {
    await sock.sendMessage(
      chatId,
      {
        text:
          "No hay más resultados."
      }
    );

    return;
  }
  const message = messageHandler(
    session.command,
    pageResults
  );
  await sock.sendMessage(
    chatId,
    message
  );
}