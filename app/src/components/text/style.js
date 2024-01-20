import styled from "styled-components";

const TextContainer = styled.div`
  color: var(--${(props) => props.color});
  height: ${(props) =>
    props.height
      ? props.height
      : props.size === "xs"
      ? "30px"
      : props.size === "sm"
      ? "30px"
      : props.size === "md"
      ? "40px"
      : props.size === "lg"
      ? "40px"
      : null};
  line-height: ${(props) =>
    props.lineHeight
      ? props.lineHeight
      : props.size === "xs"
      ? "30px"
      : props.size === "sm"
      ? "30px"
      : props.size === "md"
      ? "40px"
      : props.size === "lg"
      ? "40px"
      : null};
  font-size: ${(props) =>
    props.fontSize
      ? props.fontSize
      : props.size === "xs"
      ? "10px"
      : props.size === "sm"
      ? "14px"
      : props.size === "md"
      ? "18px"
      : props.size === "lg"
      ? "24px"
      : props.size === "xl"
      ? "60px"
      : null};
`;

export { TextContainer };
