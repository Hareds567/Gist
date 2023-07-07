import React, { FC } from "react";
import YoutubeEmbed from "../Video/YoutubeEmbed";
import useSWR from "swr";
import { getMovieVideos, getBackdropImage } from "../../../../api/movies";
import { Content } from "../../../../types/types";
import Image from "next/image";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { Map } from "../../../../types/classes";

import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  activeContent: Content;
  genres: [number, string][];
  title: string;
}
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const Display: FC<Props> = ({ activeContent, genres, title }) => {
  const genresMap = new Map(genres);
  // const { data, error, isLoading } = useSWR(getMovieVideos(activeContent.id));
  function VisualContent() {
    // if (data) {
    //   return <YoutubeEmbed videoID={data.results[0].key} />;
    // }
    return (
      <div className="relative col-span-2 w-full">
        <div className="absolute w-full h-full bg-gradient-to-r from-background-color to-[rgba(0,0,0,0)] z-30 "></div>
        <div className="absolute top-1/2 w-full h-1/2 bg-gradient-to-t from-background-color to-[rgba(0,0,0,0)] z-30 "></div>
        <Image
          className="z-20"
          alt={"img"}
          src={getBackdropImage("original", activeContent.backdrop_path)}
          fill={true}
          priority={true}
          placeholder={"blur"}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
        />
      </div>
    );
  }

  function Genres() {
    let list = ``;
    activeContent.genre_ids.forEach((id, idx) => {
      if (activeContent.genre_ids.length === 1) {
        list = `${genresMap.get(id)}`;
        return;
      }
      if (idx === 1 && activeContent.genre_ids.length === 2) {
        list += `${genresMap.get(id)}`;
        return;
      }
      if (idx === 2) {
        list += `${genresMap.get(id)}`;
        return;
      }
      if (idx < 2) {
        list += `${genresMap.get(id)}, `;
        return;
      }
    });
    return <div className="text-[#9E829C] text-lg select-none">{list}</div>;
  }

  const iconClassAfter = `after:absolute after:w-[100px] after:h-[60px] after:p-2 after:text-center after:bg-black after:content-['Movie_information'] after:top-[125%] after:left-[50%] after:opacity-1 after:translate-x-[-50%] after:rounded-md after:hidden hover:after:block hover:after:text-white`;
  const iconClassAfter2 = `after:absolute after:w-[100px] after:h-[60px] after:p-2 after:text-center after:bg-black after:content-['Add_to_watchlist'] after:top-[125%] after:left-[50%] after:opacity-1 after:translate-x-[-50%] after:rounded-md after:hidden hover:after:block hover:after:text-white`;

  const iconClassBefore =
    "before:absolute before:h-[25px] before:w-[25px] before:bg-black before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:top-[125%] before:hidden hover:before:block hover:before:opacity-100";
  const iconClassName = `relative cursor-pointer hover:text-inactive-text ${iconClassAfter} ${iconClassBefore}`;
  const iconClassName2 = `relative cursor-pointer hover:text-inactive-text ${iconClassAfter2} ${iconClassBefore}`;

  return (
    <div className="relative flex  flex-row grow h-[35vw] w-full ">
      <div
        className="absolute flex flex-col justify-between left-[5%] z-40 w-[40rem]  
      h-full pb-8"
      >
        <h1 className="text-3xl pt-10">{title}</h1>
        <div className="relative h-30">
          <div className="text-4xl pb-1">{activeContent.title}</div>
          <Genres />
          <div className=" flex mt-2 gap-1 mt-2">
            <div className={iconClassName} data-content={"Movie Info"}>
              <InfoSharpIcon fontSize="large" />
            </div>

            <div className={iconClassName2} data-content={"Add to Watchlist"}>
              <AddCircleSharpIcon fontSize="large" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative  w-1/2 "></div>
      <VisualContent />
    </div>
  );
};

export default Display;
