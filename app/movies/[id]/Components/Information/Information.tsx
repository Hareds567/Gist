"use client";
import React, { FC } from "react";
import { ContentDetails, ContentDetails2 } from "../../../../../types/types";
import Link from "next/link";
import Image from "next/image";
import imdb from "../../../../../Images/imdb.svg";
// import { getRSCModuleType } from "next/dist/build/analysis/get-page-static-info";
interface Props {
  movieData: ContentDetails;
  movieData2: ContentDetails2;
  genres: [number, string][];
}
const Information: FC<Props> = ({ movieData, genres, movieData2 }) => {
  // console.log(movieData);

  function PrintGenres() {
    let a: JSX.Element[] = [];
    movieData.genres.forEach((genre, idx) => {
      if (movieData.genres.length - 1 === idx) {
        a.push(
          <Link
            key={genres[idx][0] * Math.random() * 1000}
            className={"hover:underline hover:underline-offset-2"}
            href={"#"}
          >
            {genres[idx][1]}
          </Link>
        );
        return;
      }
      a.push(
        <Link
          key={genres[idx][0] * Math.random()}
          className={"hover:underline hover:underline-offset-2"}
          href={"#"}
        >
          {genres[idx][1]}
        </Link>
      );
      a.push(<span key={Math.random() * 1000}>, </span>);
    });
    return (
      <>
        <div className="text-active-text select-none">Genres</div>
        <div>{a}</div>
      </>
    );
  }

  function PrintRuntime() {
    if (movieData.runtime) {
      const hours = Math.floor(movieData.runtime / 60);
      const minutes = movieData.runtime % 60;
      return <div className="select-none">{`${hours}h ${minutes}min`}</div>;
    }
    return <></>;
  }
  function PrintReleaseDate() {
    const temp = movieData.release_date.split("-");
    return <div className="select-none cursor-pointer">{temp[0]}</div>;
  }
  function PrintIMDBRating() {
    return (
      <div className="flex select-none gap-1 content-center ">
        <Image src={imdb} alt={""} />
        {movieData2.imdbRating}
      </div>
    );
  }
  function PrintActors() {
    return (
      <>
        <div className="select-none text-active-text">Cast</div>
        <div className="select-none">{movieData2.Actors}</div>
      </>
    );
  }

  function PrintDirector() {
    return (
      <>
        <div className="select-none text-active-text">Director</div>
        <div className="select-none">{movieData2.Director}</div>
      </>
    );
  }
  return (
    <div className="flex flex-col  mx-10">
      <div className="flex flex-row gap-4 text-[#7A6762] font-bold text-base pt-6 align-content-center">
        <PrintIMDBRating />
        <PrintReleaseDate />
        <PrintRuntime />
      </div>

      <div className="relative pt-4">
        <div>{movieData.overview}</div>
        <div className="relative mt-4 grid grid-rows-3 grid-cols-[6rem_auto]">
          <PrintDirector />
          <PrintActors />
          <PrintGenres />
        </div>
      </div>
    </div>
  );
};

export default Information;
