export interface ContentDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {};
  budget: number;
  genres: GenreResponse[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  // minLength: 9
  // maxLength: 9 : pattern: ^tt[0-9]{7}
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  // Allowed Values: Rumored, Planned, In Production, Post Production, Released, Canceled
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ContentDetails2 {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    { Source: string; Value: string },
    { Source: string; Value: string }
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Content {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface API_Response {
  page: number;
  results: Content[];
  total_pages: number;
  total_results: number;
}

export class Images {
  base_url = "http://image.tmdb.org/t/p/";
  secure_base_url = "https://image.tmdb.org/t/p/";
  backdrop_sizes = "w300" || "w780" || "w1280" || "original";
}
//----
const _BackdropSize = {
  300: "w300",
  700: "w780",
  1280: "w1280",
  3840: "w3840",
  original: "original",
} as const;

export type BackdropSize = typeof _BackdropSize[keyof typeof _BackdropSize];

const _PosterSize = {
  300: "w92",
  700: "w154",
  1280: "w185",
  342: "w342",
  500: "w500",
  780: "w780",
  original: "original",
} as const;

export type PosterSize = typeof _PosterSize[keyof typeof _PosterSize];
//----

export type Section = {
  title: string;
  content: API_Response;
};

type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type Videos = {
  id: number;
  results: Video[];
};

export type GenreResponse = [
  {
    id: number;
    name: string;
  }
];

export type Image = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};
export type ImageResponse = {
  id: number;
  backdrops: Image[];
  posters: Image[];
};
