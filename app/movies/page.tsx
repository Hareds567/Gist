import React from "react";
import MainCategory from "./Components/MainCategory/MainCategory";
import {
  getGenres,
  getMoviesByGenre,
  getPopularMovies,
  getTrendingContent,
} from "../../api/movies";
import { API_Response, Section } from "../../types/types";
import GenreCategory from "./Components/GenreCategory/GenreCategory";

const WIDTH = 150;

const movies = async () => {
  const popularMovies = await getPopularMovies(1);
  const TrendingMovies = await getTrendingContent("week", "movie");

  const genres = await getGenres();
  const sections: Section[] = [{ title: "Trending", content: TrendingMovies }];

  const temp: API_Response[] = await getList();

  async function getList() {
    const temp2: API_Response[] = [];
    for (let i = 0; i < genres.map.length; i++) {
      if (i < 4) {
        temp2.push(await getMoviesByGenre(genres.map[i][0], 1));
      }
    }
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
      <GenreCategory genres={genres.map} list={temp} />
    </div>
  );
};

export default movies;
