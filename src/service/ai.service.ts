import { MoviePreferences } from "../constants/movieConstants.js";
import { groq } from "../integrations/groq.js";

export async function parseMoviePreferences(
  userMessage: string,
): Promise<MoviePreferences> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",

        content: `
Eres un parser de preferencias
de películas.

Tu trabajo es convertir
el texto del usuario
a JSON válido.

REGLAS:
- Devuelve SOLO JSON
- No expliques nada
- Nunca uses markdown

Usa SOLAMENTE estos géneros:

action
adventure
animation
comedy
crime
documentary
drama
family
fantasy
history
horror
music
mystery
romance
science_fiction
thriller
war

Formato:

{
  "genres": [],
  "excludeGenres": [],
  "similarTo": [],
  "minYear": null
}

Ejemplo:

Usuario:
"quiero algo como interstellar
pero más oscuro y sin romance"

Respuesta:

{
  "genres": [
    "science_fiction",
    "thriller"
  ],
  "excludeGenres": [
    "romance"
  ],
  "similarTo": [
    "Interstellar"
  ],
  "minYear": null
}

`,
      },

      {
        role: "user",
        content: userMessage,
      },
    ],

    temperature: 0.2,
  });

  const text = completion.choices[0]?.message?.content;

  if (!text) {
    throw new Error("No AI response");
  }

  const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanText);
}
