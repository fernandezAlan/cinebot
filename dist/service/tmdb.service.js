import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
    params: {
        language: "es-AR",
    },
});
//request
export const getMovie = async () => {
    const res = await tmdbApi.get("/movie/640146");
    return res.data;
};
export async function searchPersonByName(name) {
    const response = await tmdbApi.get("/search/person", {
        params: {
            query: name,
            language: "es-AR",
        },
    });
    console.log("searchPersonByName response:", response.data.results);
    return response.data.results[0];
}
export const getSimilarMovie = async (movieiD) => {
    const response = await tmdbApi.get(`/movie/${movieiD}/recommendations`);
    return response.data.result;
};
export const discoverMovie = async (preferences, page = 1) => {
    const { genres, excludeGenres, cast, crew } = preferences;
    const response = await tmdbApi.get("/discover/movie", {
        params: {
            include_adult: false,
            sort_by: "vote_average.desc",
            ["vote_count.gte"]: 1000,
            with_genres: genres?.join(","),
            without_genres: excludeGenres?.join(","),
            primary_release_year: preferences.minYear,
            ["vote_average.gte"]: 7,
            language: "es-AR",
            with_cast: cast?.join(","),
            with_crew: crew?.join(","),
            page: page
        },
    });
    return response.data.results;
};
export async function getMovieCredits(personId) {
    const respose = await tmdbApi.get(`/person/${personId}/movie_credits`);
    console.log("getMovieCredits response:", respose.data.cast.length);
    return respose.data;
}
export async function getNowPlayingMovies() {
    const response = await tmdbApi.get("/movie/now_playing");
    //just return movies with more than 500 votes to ensure quality of recommendations
    return response.data.results.filter((movie) => movie.vote_count >= 100);
}
export async function getMovieImages(movieId) {
    const response = await tmdbApi.get(`/movie/${movieId}/images`);
    return response.data.backdrops;
}
