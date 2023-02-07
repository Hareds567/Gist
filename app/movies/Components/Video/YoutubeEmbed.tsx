import React, { FC } from "react";

interface Props {
  videoID: string;
}

const YoutubeEmbed: FC<Props> = ({ videoID }: Props) => {
  return (
    <div>
      <iframe
        width={`320`}
        height={`250`}
        src={`https;//youtube.com/embed/${videoID}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={`Embedded video`}
      />
    </div>
  );
};

export default YoutubeEmbed;
