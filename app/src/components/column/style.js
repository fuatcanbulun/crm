import styled from "styled-components";

const ColumnContainer = styled.div`
  position: relative;
  display: ${(props) => (props.display ? props.display.xs : "flex")};
  justify-content: ${(props) => props.justify};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  align-items: ${(props) => props.align};
  padding: ${(props) => props.padding};
  width: ${(props) => (props.width ? props.width.xs : props.xs * 4.16 + "%")};
  min-width: ${(props) =>
    props.minWidth ? props.minWidth.xs : props.xs * 4.16 + "%"};
  @media only screen and (min-width: 760px) {
    display: ${(props) => (props.display ? props.display.sm : "flex")};
    width: ${(props) => (props.width ? props.width.sm : props.sm * 4.16 + "%")};
    min-width: ${(props) =>
      props.minWidth ? props.minWidth.sm : props.sm * 4.16 + "%"};
  }
  @media only screen and (min-width: 1200px) {
    display: ${(props) => (props.display ? props.display.md : "flex")};
    width: ${(props) => (props.width ? props.width.md : props.md * 4.16 + "%")};
    min-width: ${(props) =>
      props.minWidth ? props.minWidth.md : props.md * 4.16 + "%"};
  }
  @media only screen and (min-width: 1400px) {
    display: ${(props) => (props.display ? props.display.lg : "flex")};
    width: ${(props) => (props.width ? props.width.lg : props.lg * 4.16 + "%")};
    min-width: ${(props) =>
      props.minWidth ? props.minWidth.lg : props.lg * 4.16 + "%"};
  }
`;

export { ColumnContainer };
