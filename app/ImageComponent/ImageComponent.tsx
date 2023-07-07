import React from "react";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  onLoad: () => {};
  src: string;
}

const ImageComponent: React.FC<Props> = ({ onLoad, src }) => {
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <>
      <LazyLoadImage src={src} alt="Movie Poster" effect="blur" />
    </>
  );
};

export default ImageComponent;
