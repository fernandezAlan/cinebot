export async function PingCommand(sock, chatId) {
    await sock.sendMessage(chatId, {
        text: "pong 🏓"
    });
}
