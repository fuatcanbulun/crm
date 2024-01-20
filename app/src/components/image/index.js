import React from "react";
import { ImageContainer } from "./style";

const Image = ({ imageName, type, size, width, height, opacity }) => {
  return (
    <ImageContainer
      size={size}
      width={width}
      height={height}
      opacity={opacity}
      url={require(`../../assets/images/${imageName}.${type ? type : "jpg"}`)}
    />
  );
};

export default Image;
