import { commandNames } from "../constants/constanst.js";
import { messageHandler } from "../handlers/messages.handler.js";
import { searchSessions } from "../store/search-session.store.js";

export async function SelectOptionCommand (sock: any, chatId: string, option: number){
    const session = searchSessions.get(chatId);
    if (!session) {
        await sock.sendMessage(chatId, {
            text: "No hay una búsqueda activa."
        })
        return;
    }
    const selectedOption = session.results[option - 1];
    if(!selectedOption){
        await sock.sendMessage(chatId, {
            text: "Opción no válida."
        })
        return;
    }
    const message = messageHandler(commandNames.SELECT_OPTION, [selectedOption]);
    await sock.sendMessage(chatId, message);
}