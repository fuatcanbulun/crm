import React from "react";
import {
  StickerBoxContainer,
  StickerBoxImage,
  StickerBoxBody,
  StickerBoxLabel,
  StickerBoxValue,
} from "./style";

import Text from "../text";
import DynamicImage from "../dynamicImage";

const StickerBox = ({ label, image, value, color }) => {
  return (
    <StickerBoxContainer color={color}>
      <StickerBoxImage>
        <DynamicImage image={image} width={50} height={50} />
        {/* <Image
          imageName={image}
          type="png"
          width={{ xs: "40px", sm: "40px", md: "60px", lg: "60px" }}
          height={{ xs: "40px", sm: "40px", md: "60px", lg: "60px" }}
          size="cover"
          opacity="0.2"
        /> */}
      </StickerBoxImage>
      <StickerBoxBody>
        <StickerBoxLabel>
          <Text
            label={label}
            height="15px"
            lineHeight="15px"
            fontSize="0.8rem"
            color="textPrimary"
          />
        </StickerBoxLabel>
        <StickerBoxValue>
          <Text
            label={value}
            height="30px"
            lineHeight="30px"
            fontSize="1.2rem"
            color="textPrimary"
          />
        </StickerBoxValue>
      </StickerBoxBody>
    </StickerBoxContainer>
  );
};

export default StickerBox;
