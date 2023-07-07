import React from "react";
import { API_Response } from "../../types/types";
//Components
import { Card1 } from "../Cards/Card1";
interface Props {
  type: string;
  title: string;
  content: API_Response;
}
const CategoryT1: React.FC<Props> = ({ content, title }) => {
  return (
    <>
      <div>{title}</div>
      <div className={`grid grid-cols-10 grid-rows-2 gap-4 w-full`}>
        {content.results.map((obj) => {
          return <Card1 key={Math.random() * 1000} content={obj} />;
        })}
      </div>
    </>
  );
};

export default CategoryT1;
