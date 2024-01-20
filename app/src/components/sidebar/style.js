import styled from "styled-components";

const SideBarContainer = styled.div`
  width: 240px;
  height: calc(100vh - 50px);
  background-color: black;
  @media only screen and (min-width: 760px) {
    height: 100vh;
  }
`;

export { SideBarContainer };
