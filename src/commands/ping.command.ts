export async function PingCommand(
  sock: any,
  chatId: string
) {
  await sock.sendMessage(chatId, {
    text: "pong 🏓"
  });
}