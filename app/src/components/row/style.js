import styled from "styled-components";

const RowContainer = styled.div`
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bgColor};
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "unset")};
`;

export { RowContainer };
