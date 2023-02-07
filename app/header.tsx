"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

function Options() {
  const router = useRouter();
  const [activeMenu, set_activeMenu] = React.useState("Movies");

  function onClick(obj: string) {
    set_activeMenu(obj);
    router.push(`${obj.toLocaleLowerCase().replace(" ", "-")}`);
  }

  const res = ["Search", "Tv Shows", "Movies"].map((obj) => {
    if (obj === "Search") {
      return <Search key={obj} />;
    }
    return (
      <div
        className={`cursor-pointer ${
          activeMenu !== obj ? "text-inactive-text" : "text-active-text"
        } px-3 py-1 hover:text-title-text`}
        key={obj}
        onClick={(e) => onClick(obj)}
      >
        {obj}
      </div>
    );
  });
  return <>{res}</>;
}

function Search() {
  return (
    <div className="px-3 cursor-pointer text-inactive-text py-6">
      {<SearchIcon />}
    </div>
  );
}

const Header = () => {
  return (
    <div className="grid grid-cols-2 align-items-center px-8 ">
      <div className="flex items-center ">Glist</div>
      <div className="flex flex-cols items-center justify-end">
        <Options />
      </div>
    </div>
  );
};

export default Header;
