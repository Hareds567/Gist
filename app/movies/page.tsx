import React from "react";
import MainCategory from "./Components/MainCategory/MainCategory";
import {
  getGenres,
  getMoviesByGenre,
  getPopularMovies,
  getTrendingContent,
  getMoviesByReleaseDate,
} from "../../api/movies";
import { API_Response, Section } from "../../types/types";
import GenreCategory from "./Components/GenreCategory/GenreCategory";
import { Map } from "../../types/classes";
import CategoryT1 from "../../src/Categories/Category1";

const WIDTH = 150;

type MovieToSort = [string, string[]];

const movies = async () => {
  const popularMovies = await getPopularMovies(1);
  const TrendingMovies = await getTrendingContent("week", "movie");
  const latestMovies = await getMoviesByReleaseDate();

  const genres = await getGenres();
  const sections: Section[] = [{ title: "Trending", content: TrendingMovies }];

  const temp: API_Response[] = await getList();

  async function getList() {
    const temp2: API_Response[] = [];
    const moviesToSort: MovieToSort[] = [];
    const genresTemp = new Map(genres.map);
    for (let i = 0; i < genres.map.length; i++) {
      if (i < 4) {
        const movie = await getMoviesByGenre(genres.map[i][0], 1);
        movie.results.forEach((movie) => {
          const g = movie.genre_ids.map((id) => {
            return genresTemp.get(id) || "";
          });
          moviesToSort.push([movie.title, g]);
        });

        temp2.push(movie);
      }
    }
    // console.log(moviesToSort);
    return temp2;
  }

  return (
    <div className="relative flex flex-col w-full h-full">
      <MainCategory
        genres={genres.map}
        key={"Most Popular"}
        title={`Trending Movies`}
        content={TrendingMovies}
        card_width={150}
      />
      <CategoryT1
        type={"movie"}
        content={latestMovies}
        title={"Latest Movies"}
      />
    </div>
  );
};

export default movies;
