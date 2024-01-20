import styled from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  opacity: ${(props) => props.opacity};
  background-image: url(${(props) => props.url});
  background-size: cover;
  width: ${(props) =>
    props.width && props.width.xs
      ? props.width.xs
      : props.width
      ? props.width
      : "100%"};
  height: ${(props) =>
    props.height && props.height.xs
      ? props.height.xs
      : props.height
      ? props.height
      : "100%"};
  @media only screen and (min-width: 760px) {
    width: ${(props) =>
      props.width && props.width.sm
        ? props.width.sm
        : props.width
        ? props.width
        : "100%"};
    height: ${(props) =>
      props.height && props.height.sm
        ? props.height.sm
        : props.height
        ? props.height
        : "100%"};
  }
  @media only screen and (min-width: 1200px) {
    width: ${(props) =>
      props.width && props.width.md
        ? props.width.md
        : props.width
        ? props.width
        : "100%"};
    height: ${(props) =>
      props.height && props.height.md
        ? props.height.md
        : props.height
        ? props.height
        : "100%"};
  }
  @media only screen and (min-width: 1400px) {
    width: ${(props) =>
      props.width && props.width.lg
        ? props.width.lg
        : props.width
        ? props.width
        : "100%"};
    height: ${(props) =>
      props.height && props.height.lg
        ? props.height.lg
        : props.height
        ? props.height
        : "100%"};
  }
`;

export { ImageContainer };
