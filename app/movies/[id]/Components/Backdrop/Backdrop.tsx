"use client";
import React, { FC } from "react";
import { getBackdropImage } from "../../../../../api/movies";
import { ContentDetails, ImageResponse } from "../../../../../types/types";

import Image from "next/image";
interface Props {
  movieData: ContentDetails;
}

const Backdrop: FC<Props> = ({ movieData }) => {
  function handleBackdrop() {
    return getBackdropImage("original", movieData.backdrop_path);
  }

  return (
    <div className={`relative w-full h-[40vw] max-h-[800px] overflow-hidden`}>
      <h1 className="absolute z-20 top-[10%] left-0 text-4xl bg-[rgba(0,0,0,.6)] w-fit  p-5 select-none shadow-xl rounded-r ">
        {movieData.title}
      </h1>
      <div className="absolute w-full h-[56vw] z-10 select-none">
        <Image
          src={handleBackdrop()}
          className={`select-none`}
          alt={movieData.title + "_bgImage"}
          fill={true}
          sizes={"3840px"}
        />
      </div>
    </div>
  );
};

export default Backdrop;
