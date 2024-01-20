import React from "react";
import { RowContainer } from "./style";

const Row = ({ children, ...props }) => {
  return <RowContainer {...props}>{children}</RowContainer>;
};

export default Row;
