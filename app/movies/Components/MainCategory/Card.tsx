"use client";

import React from "react";
import { Content } from "../../../../types/types";
import { getPosterImage, getBackdropImage } from "../../../../api/movies";
import Image from "next/image";
interface Props {
  content: Content;
  card_width: number;
  activeContentId: number;
  set_activeContent: React.Dispatch<React.SetStateAction<Content>>;
}
const Card: React.FC<Props> = ({
  content,
  set_activeContent,
  card_width,
  activeContentId,
}) => {
  const posterImage = getPosterImage("original", content.poster_path);

  function checkActiveContent() {
    if (activeContentId === content.id) {
      return true;
    }
    return false;
  }

  return (
    <div
      className={`relative h-full hover:cursor-pointer ${
        checkActiveContent() && "border"
      }`}
      onClick={() => set_activeContent(content)}
      style={{ width: card_width }}
    >
      {content.title}
      <Image
        src={posterImage}
        alt={"Movie Poster"}
        fill={true}
        sizes={"600px"}
      />
    </div>
  );
};

export default Card;
