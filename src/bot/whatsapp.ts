import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import { commandHandler } from "../handlers/command.handler.js";
import QRCode from "qrcode-terminal";

export async function startWhatsappBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on(
    "connection.update",
    async ({ connection, qr, lastDisconnect }) => {
      if (qr) {
        console.log("📱 Escanea el QR:");

        QRCode.generate(qr, {
          small: true,
        });
      }

      if (connection === "open") {
        console.log("✅ WhatsApp conectado");
      }

      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as any)?.output?.statusCode !==
          DisconnectReason.loggedOut;

        console.log("❌ Conexión cerrada");

        if (shouldReconnect) {
          console.log("🔄 Reconectando...");

          startWhatsappBot();
        }
      }
    },
  );

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const message = messages[0];

    if (!message.message) return;

    const chatId = message.key.remoteJid;

    //if (!chatId?.endsWith("@g.us"))
    // return;

    const text =
      message.message.conversation || message.message.extendedTextMessage?.text;

    if (!text) return;

    console.log("📩", text);

    if (chatId) await commandHandler(sock, chatId, text);
  });
}
