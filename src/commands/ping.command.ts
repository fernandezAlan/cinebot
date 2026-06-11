export async function pingCommand(
  sock: any,
  chatId: string
) {
  await sock.sendMessage(chatId, {
    text: "pong 🏓"
  });
}