"use client";

import React from "react";
import { Content } from "../../../../../../types/types";
import { getPosterImage, getBackdropImage } from "../../../../../../api/movies";
import Image from "next/image";
import Link from "next/link";

interface Props {
  content: Content;
  card_width: number;
  activeContentId: number;
}
const Card: React.FC<Props> = ({ content, card_width, activeContentId }) => {
  const posterImage = getPosterImage("original", content.poster_path);

  return (
    <Link
      href={`movies/${content.id}`}
      className={`relative h-full hover:cursor-pointer`}
      // onClick={() => set_activeContent(content)}
      style={{ width: card_width }}
    >
      {content.title}
      <Image
        src={posterImage}
        alt={"Movie Poster"}
        fill={true}
        sizes={"600px"}
      />
    </Link>
  );
};

export default Card;
