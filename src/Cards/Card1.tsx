import React, { FC } from "react";
import { getPosterImage } from "../../api/movies";
import { Content } from "../../types/types";
import Image from "next/image";
interface Props {
  content: Content;
}

export const Card1: FC<Props> = (content) => {
  const image = getPosterImage("w185", content.content.poster_path);
  const width = 175;
  function calculateHeight(width: number) {
    return (3 * width) / 2;
  }
  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: `${width}px`, height: `${calculateHeight(190) + 20}px` }}
    >
      <Image
        src={image}
        priority={true}
        alt="posterImage"
        width={width}
        height={calculateHeight(width)}
        style={{ objectFit: "cover", overflow: "hidden" }}
      />
      <div className="relative w-full mt-2">
        <div
          className="w-full overflow-hidden "
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontSize: ".95 rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {content.content.title}
        </div>
      </div>
    </div>
  );
};
