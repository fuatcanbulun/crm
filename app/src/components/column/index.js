import React from "react";
import { ColumnContainer } from "./style";

const Column = ({ children, ...props }) => {
  return <ColumnContainer {...props}>{children}</ColumnContainer>;
};

export default Column;
