import { MovieCredits } from "../constants/person.types.js";

export function formatCredits(
  credits: MovieCredits[]
): string {
  if (credits.length === 0) {
    return "No tiene créditos destacados.";
  }

  return credits
    .map(
      credit =>
        `⭐ ${credit.title} (${
          credit.release_date?.split("-")[0] ??
          "N/A"
        })`
    )
    .join("\n");
}

export async function sendPersonInfo(
  sock: any,
  chatId: string,
  person: any,
  credits: MovieCredits[],
  personName: string
) {
     if (!person) {
    await sock.sendMessage(chatId, {
      text: `No encontré a ${personName} 😢`,
    });

    return;
  }
  const imageUrl =
    `https://image.tmdb.org/t/p/w500${person.profile_path}`;

  await sock.sendMessage(chatId, {
    image: {
      url: imageUrl,
    },
    caption:
      `Encontré a ${person.name} 🎬\n\n` +
      `Conocido por:\n` +
      formatCredits(credits),
  });
}

export function getPersonName(text: string): string {
     return text.split(" ").slice(1).join(" ");
}