import React from "react";
import { getTrendingContent } from "../api/movies";

const page = async () => {
  const movies = await getTrendingContent("day", "movie");
  return <div>Home</div>;
};

export default page;
