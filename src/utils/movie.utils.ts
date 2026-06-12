
import { CreditType, MovieCredits } from "../constants/person.types.js";
import { getMovieCredits, tmdbApi } from "../service/tmdb.service.js";


export async function getCredits(personId: string,creditType: CreditType): Promise<MovieCredits[]> {
  const credits = await getMovieCredits(personId);
  let filteredCredits: MovieCredits[] = credits[creditType].filter(
    (credit: any) => credit.vote_average >= 7 && credit.vote_count >= 1000
  );
  if(creditType === CreditType.Crew){
    filteredCredits = filteredCredits.filter((credit: any) => credit.department === "Directing");
  }
  //sort by vote_average
  filteredCredits.sort((a: any, b: any) => b.vote_average - a.vote_average);
  //return only 10 results
  filteredCredits = filteredCredits.slice(0, 10);
  return filteredCredits;
  };


export async function
searchMovieId(
  movieName: string
) {
  const res =
    await tmdbApi.get(
      "/search/movie",
      {
        params: {
          query: movieName
        }
      }
    );

  return res.data.results[0]
    ?.id;
}