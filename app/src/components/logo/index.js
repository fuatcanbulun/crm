import React from "react";
import { LogoContainer } from "./style";
import Image from "../image";

const Logo = ({ type }) => {
  return (
    <LogoContainer type={type}>
      <Image
        width={{ xs: "50px", sm: "100px", md: "100px", lg: "100px" }}
        height={{ xs: "50px", sm: "100px", md: "100px", lg: "100px" }}
        type="png"
        imageName="logo"
        size="cover"
      />
    </LogoContainer>
  );
};

export default Logo;
