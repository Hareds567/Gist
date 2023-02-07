import axios, { AxiosError } from "axios";
import {
  API_Response,
  BackdropSize,
  PosterSize,
  Videos,
  GenreResponse,
  ContentDetails,
  ImageResponse,
  ContentDetails2,
} from "../types/types";
import { Map } from "../types/classes";

const URL = "https://api.themoviedb.org/3";
const URL2 = `http://www.omdbapi.com`;
const API_KEY = process.env.NEXT_PUBLIC_APIKEY;
const API_KEY2 = process.env.APIKEY2;

async function apiCall<T>(promise: Promise<T>) {
  try {
    return await promise;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      const statusCode = e.response.status; // 400
      const statusText = e.response.statusText; // Bad Request
      const message = e.response.data.message; // id should not be empty
      console.log(`${statusCode} - ${statusText} - ${message}`);
    }
  }
}
//- Calls --------------------------------------------------------------------------------------------
export async function getTrendingContent(
  time_window: "day" | "week",
  media_type: "all" | "movie" | "tv"
) {
  const url = `${URL}/trending/${media_type}/${time_window}`;
  const res = await apiCall(axios.get(url, { params: { api_key: API_KEY } }));
  return res?.data as API_Response;
}

export async function getPopularMovies(page: number) {
  const url = `${URL}/movie/popular`;
  const res = await apiCall(
    axios.get(url, {
      params: { api_key: API_KEY, language: "en-US", page: page },
    })
  );
  return res?.data as API_Response;
}

export async function getMoviesByGenre(genreID: number, page: number) {
  const url = `${URL}/discover/movie`;
  const res = await apiCall(
    axios.get(url, {
      params: { api_key: API_KEY, with_genres: genreID, page: page },
    })
  );
  return res?.data as API_Response;
}

export async function getMovie(id: number) {
  const url = `${URL}/movie/${id}?api_key=${API_KEY}`;
  const res = await apiCall(fetch(url, { cache: "no-store" }));
  const data = (await res?.json()) as ContentDetails;

  const imdb_id = data.imdb_id ? data.imdb_id?.toString() : "";
  const params2 =
    API_KEY2 &&
    new URLSearchParams({ apikey: API_KEY2, i: imdb_id }).toString();
  const res2 = await apiCall(
    fetch(`${URL2}/?${params2}`, { cache: "no-store" })
  );
  const data2 = (await res2?.json()) as ContentDetails2;

  return { data, data2 };
}

//- Images  --------------------------------------------------------------------------------------------
export function getPosterImage(size: PosterSize, file_path: string | null) {
  if (file_path) {
    const url = `https://image.tmdb.org/t/p/${size}/${file_path}`;
    return url;
  }
  return "";
}

export function getBackdropImage(size: BackdropSize, file_path: string | null) {
  if (file_path) {
    const url = `https://image.tmdb.org/t/p/${size}/${file_path}`;
    return url;
  }
  return "";
}
export function getBackdropImage2(size: string, file_path: string) {
  if (file_path) {
    const url = `https://image.tmdb.org/t/p/${size}/${file_path}`;
    return url;
  }
  return "";
}
//- Videos  --------------------------------------------------------------------------------------------
export async function getMovieVideos(movieID: number) {
  const url = `${URL}/movie/${movieID}/videos`;
  const res = await apiCall(axios.get(url, { params: { api_key: API_KEY } }));

  return res?.data as Videos;
}

export async function getGenres() {
  const url = `${URL}/genre/movie/list`;
  const tempRes = await apiCall(
    axios.get(url, { params: { api_key: API_KEY } })
  );
  const res = tempRes?.data.genres as GenreResponse;

  const genres = new Map<number, string>();
  res.forEach((id) => {
    genres.set(id.id, id.name);
  });
  return genres;
}

export async function getSimilarContent(id: number) {
  const url = `${URL}/movie/${id}/similar`;
  const params = API_KEY
    ? new URLSearchParams({ api_key: API_KEY }).toString()
    : "";
  const res = await apiCall(fetch(`${url}?${params}`));
  const data = await res?.json();
  return data as API_Response;
}
