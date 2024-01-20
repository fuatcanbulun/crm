import styled from "styled-components";

const SpaceContainer = styled.div`
  height: ${(props) => props.height + "px"};
  width: ${(props) => (props.width ? props.width : "100%")};
`;

export { SpaceContainer };
