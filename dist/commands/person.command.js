import { searchPersonByName } from "../service/tmdb.service.js";
import { getCredits } from "../utils/movie.utils.js";
import { sendPersonInfo } from "../utils/person.utils.js";
export async function PersonCommand(sock, chatId, text, CreditType) {
    const personName = text.split(" ").slice(1).join(" ");
    const person = await searchPersonByName(personName);
    const credits = await getCredits(person.id, CreditType);
    //send person info to user
    sendPersonInfo(sock, chatId, person, credits, personName);
}
