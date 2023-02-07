"use client";
import React, { FC } from "react";
import { API_Response } from "../../../../types/types";
import Category from "./Category";

interface Props {
  list: API_Response[];
  genres: [number, string][];
}

const WIDTH = 150;

const GenreCategory: FC<Props> = ({ genres, list }) => {
  const [genreList, set_genreList] = React.useState(list);

  return (
    <div className="relative">
      {genreList.map((list, idx) => {
        return (
          <Category
            key={genres[idx][0]}
            card_width={WIDTH}
            card_height={(WIDTH * 3) / 2}
            genres={genres}
            content={list}
            title={genres[idx][1]}
          />
        );
      })}
    </div>
  );
};

export default GenreCategory;
