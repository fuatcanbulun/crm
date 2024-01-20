import React from "react";
import { AnyContainer } from "./style";

const Any = ({ children, ...props }) => {
  return <AnyContainer style={{ ...props }}>{children}</AnyContainer>;
};

export default Any;
