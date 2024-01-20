import React from "react";
import { TextContainer } from "./style";

const Text = ({ label, align, size, height, lineHeight, fontSize, color }) => {
  return (
    <TextContainer
      size={size}
      height={height}
      lineHeight={lineHeight}
      fontSize={fontSize}
      align={align}
      color={color}
    >
      {label}
    </TextContainer>
  );
};

export default Text;
