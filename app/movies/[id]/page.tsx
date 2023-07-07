import React from "react";
import {
  getBackdropImage,
  getGenres,
  getMovie,
  getMovieVideoSource,
} from "../../../api/movies";
import Backdrop from "./Components/Backdrop/Backdrop";
import Information from "./Components/Information/Information";
import SimilarMovies from "./Components/SimilarMovies/SimilarMovies";

const page = async ({ params: { id } }: { params: { id: number } }) => {
  const { data, data2 } = await getMovie(id);
  const genres = await getGenres();
  const video = await getMovieVideoSource(id);

  return (
    <div className="relative">
      <Backdrop movieData={data} />
      <Information movieData={data} movieData2={data2} genres={genres.map} />
      <SimilarMovies movie_id={data.id} genres={genres.map} />
    </div>
  );
};

export default page;
