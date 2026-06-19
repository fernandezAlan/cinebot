import { RESULTS_PAGE_SIZE } from "../constants/constanst.js";
import { CreditType } from "../constants/person.types.js";
import { getMovieCredits, tmdbApi } from "../service/tmdb.service.js";
export async function getCredits(personId, creditType) {
    const credits = await getMovieCredits(personId);
    let filteredCredits = credits[creditType].filter((credit) => credit.vote_average >= 7 && credit.vote_count >= 1000);
    if (creditType === CreditType.Crew) {
        filteredCredits = filteredCredits.filter((credit) => credit.department === "Directing");
    }
    //sort by vote_average
    filteredCredits.sort((a, b) => b.vote_average - a.vote_average);
    //return only 10 results
    filteredCredits = filteredCredits.slice(0, 10);
    return filteredCredits;
}
;
export async function searchMovieId(movieName) {
    const res = await tmdbApi.get("/search/movie", {
        params: {
            query: movieName
        }
    });
    return res.data.results[0]
        ?.id;
}
export function getPage(results, page) {
    const start = page * RESULTS_PAGE_SIZE;
    const end = start + RESULTS_PAGE_SIZE;
    return results.slice(start, end);
}
