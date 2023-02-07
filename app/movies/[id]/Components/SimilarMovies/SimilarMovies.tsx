"use client";
import React, { FC } from "react";
import useSwr from "swr";
import { getSimilarContent } from "../../../../../api/movies";
import Category from "./Carousel/Category";
interface Props {
  movie_id: number;
  genres: [number, string][];
}
const WIDTH = 150;
const SimilarMovies: FC<Props> = ({ movie_id, genres }) => {
  const { data, isLoading, error } = useSwr(
    `movie/${movie_id}/similar_content`,
    () => getSimilarContent(movie_id)
  );

  function PrintCarousel() {
    if (data) {
      return (
        <Category
          title="More Like This"
          content={data}
          card_width={WIDTH}
          card_height={(WIDTH * 3) / 2}
          genres={genres}
        />
      );
    }
    if (isLoading) {
      return <div>Loading</div>;
    }
    return <></>;
  }

  return (
    <div className="m-10 ">
      <PrintCarousel />
    </div>
  );
};

export default SimilarMovies;
