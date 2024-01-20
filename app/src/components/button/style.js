import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  cursor: pointer;
  transition: 0.5s;
  background-color: ${(props) =>
    props.size === "xs"
      ? "transparent"
      : props.size === "sm"
      ? "transparent"
      : props.size === "md"
      ? props.type === "outlined"
        ? "transparent"
        : "var(--activePrimary)"
      : props.size === "lg"
      ? "transparent"
      : null};
  border: ${(props) =>
    props.type === "outlined" ? "1px solid var(--colorTertiary)" : "none"};
  flex-direction: ${(props) => (props.size === "lg" ? "column" : "row")};
  justify-content: ${(props) =>
    props.size === "xs"
      ? "center"
      : props.size === "sm"
      ? "center"
      : props.size === "md"
      ? "center"
      : props.size === "lg"
      ? "center"
      : null};
  align-items: center;
  height: ${(props) =>
    props.size === "xs"
      ? "30px"
      : props.size === "sm"
      ? "30px"
      : props.size === "md"
      ? "30px"
      : props.size === "lg"
      ? "80px"
      : null};
  width: ${(props) =>
    props.size === "xs"
      ? "30px"
      : props.size === "sm"
      ? "100px"
      : props.size === "md"
      ? "200px"
      : props.size === "lg"
      ? "80px"
      : null};
  border-radius: ${(props) =>
    props.size === "xs"
      ? "5px"
      : props.size === "sm"
      ? "5px"
      : props.size === "md"
      ? "5px"
      : props.size === "lg"
      ? "5px"
      : null};
  &:hover {
    background-color: ${(props) =>
      props.size === "xs"
        ? "transparent"
        : props.size === "sm"
        ? "var(--activePrimary)"
        : props.size === "md"
        ? "var(--hoverPrimary)"
        : props.size === "lg"
        ? "transparent"
        : null};
  }
`;

export { ButtonContainer };
