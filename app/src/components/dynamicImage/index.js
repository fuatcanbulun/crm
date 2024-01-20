import React from "react";
import { DynamicImageContainer } from "./style";

const DynamicImage = ({ image, width, height }) => {
  console.log("image", image);

  return (
    <DynamicImageContainer>
      <img src={image} width={width} height={height} />
    </DynamicImageContainer>
  );
};

export default DynamicImage;
