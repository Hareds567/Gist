"use client";
import React, { FC, useRef, useEffect } from "react";
import { API_Response, Section } from "../../../../types/types";
import Card from "./Card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import anime from "animejs/lib/anime.es.js";
import { title } from "process";

interface Props {
  content: API_Response;
  card_width: number;
  card_height: number;
  genres: [number, string][];
  title: string;
}
const Category: FC<Props> = ({
  content,
  card_width,
  genres,
  title,
  card_height,
}) => {
  const cards_container = useRef<HTMLDivElement>(null);
  const category_container = useRef<HTMLDivElement>(null);

  const [state, set_state] = React.useState({
    isStart: true,
    isEnd: false,
    current_x: 0,
  });

  function animate(translateX: number | number[], duration?: number) {
    // console.log(`translateX: ${translateX}`);
    const time = duration || 150;
    anime({
      targets: `#card_container-${title}`,
      translateX: translateX,
      easing: "linear",
      duration: time,
    });
  }

  function backwards() {
    // console.log(".......");
    if (cards_container.current && category_container.current) {
      const gap = 8;
      const max_width = cards_container.current.offsetWidth; //Total Cards Length
      //Number of Cards that are visible on screen
      const numberOfVisibleCards = Math.floor(
        category_container.current.offsetWidth / card_width
      );
      //Card_container left:0
      if (state.isStart) {
        const transform_width =
          (numberOfVisibleCards * card_width + gap * numberOfVisibleCards) * -1;
        const tempResult = state.current_x - transform_width;
        if (tempResult < 0) {
          animate(tempResult);
          set_state({ ...state, current_x: tempResult });
        }
        if (tempResult >= 0) {
          cards_container.current.classList.replace("right-0", "left-0");
          animate(0);
          set_state({ isStart: true, isEnd: false, current_x: 0 });
        }
      }
      //Card_container right:0
      if (state.isEnd) {
        const transform_width =
          numberOfVisibleCards * card_width + gap * numberOfVisibleCards;
        const tempResult = state.current_x + transform_width;
        if (
          tempResult < max_width &&
          max_width - tempResult > category_container.current.offsetWidth
        ) {
          animate(tempResult);
          set_state({ ...state, current_x: tempResult });
        }
        if (max_width - tempResult < category_container.current.offsetWidth) {
          const temp3 = (max_width - tempResult) * -1;
          cards_container.current.classList.replace("right-0", "left-0");
          set_state({ isStart: true, isEnd: false, current_x: 0 });
          animate([temp3, 0]);
        }
      }
    }
  }

  function forwards() {
    if (cards_container.current && category_container.current) {
      const max_width = cards_container.current.offsetWidth; //Total Cards Length
      const gap = 8;
      //Number of Cards that are visible on screen
      const numberOfVisibleCards = Math.floor(
        category_container.current.offsetWidth / card_width
      );
      //Card_container left:0
      if (state.isStart) {
        const transform_width =
          (numberOfVisibleCards * card_width + gap * numberOfVisibleCards) * -1;
        const tempResult = state.current_x + transform_width;
        if (
          tempResult * -1 < max_width &&
          max_width + tempResult > category_container.current.offsetWidth
        ) {
          animate(tempResult);
          set_state({ ...state, current_x: tempResult });
        }
        if (max_width + tempResult < category_container.current.offsetWidth) {
          const temp3 = max_width - tempResult * -1;
          cards_container.current.classList.replace("left-0", "right-0");
          anime({
            targets: `#card_container-${title}`,
            translateX: [temp3, 0],
            easing: "linear",
            duration: 150,
          });
          set_state({ isStart: false, isEnd: true, current_x: 0 });
        }
      }

      //Card_container right:0
      if (state.isEnd) {
        const transform_width =
          (numberOfVisibleCards * card_width + gap * numberOfVisibleCards) * -1;
        const tempResult = state.current_x + transform_width;
        if (tempResult < max_width && tempResult !== 0) {
          animate(tempResult);
          set_state({ ...state, current_x: tempResult });
        }
        if (tempResult === 0) {
          cards_container.current.classList.replace("left-0", "right-0");
          animate(0);
          set_state({ isEnd: true, isStart: false, current_x: 0 });
        }
      }
    }
  }
  // useEffect(() => console.log(state), [state]);

  function BackButton() {
    return (
      <div
        className="absolute flex items-center justify-center w-10 h-full bg-[rgba(15,23,30,.5);] left-0 z-10 opacity-60 hover:cursor-pointer hover:opacity-90"
        onClick={() => {
          backwards();
        }}
      >
        <ArrowBackIosNewIcon />
      </div>
    );
  }
  function ForwardsButton() {
    return (
      <div
        className="absolute flex items-center justify-center w-10 h-full bg-[rgba(15,23,30,.5)] right-0 z-10 opacity-60 hover:cursor-pointer hover:opacity-90"
        onClick={() => {
          forwards();
        }}
      >
        <ArrowForwardIosIcon />
      </div>
    );
  }

  const [activeContent, set_activeContent] = React.useState(content.results[0]);

  return (
    <div className="relative h-auto">
      <div className="text-3xl px-8 py-3 mt-8 ">{title}</div>
      <div
        className={`relative overflow-hidden`}
        style={{ height: card_height }}
        ref={category_container}
      >
        <div
          className={`absolute grid grid-flow-col gap-x-2 z-0 px-8 left-0`}
          style={{ translate: 0, height: card_height }}
          ref={cards_container}
          id={`card_container-${title}`}
        >
          {content.results.map((obj) => {
            return (
              <Card
                key={obj.id}
                card_width={card_width}
                content={obj}
                activeContentId={activeContent.id}
              />
            );
          })}
        </div>

        {(!state.isStart || state.current_x !== 0) && <BackButton />}
        {(!state.isEnd || state.current_x !== 0) && <ForwardsButton />}
      </div>
    </div>
  );
};

export default Category;
