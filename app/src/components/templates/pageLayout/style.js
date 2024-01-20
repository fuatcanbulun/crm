import styled from "styled-components";

const PageLayoutContainer = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  background-color: var(--colorSecondary);
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    border-radius: 2px;
  }
  &::-webkit-scrollbar {
    width: 4px;
    background-color: var(--colorTertiary);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    width: 4px;
    background-color: var(--activePrimary);
  }

  @media only screen and (min-width: 760px) {
    height: 100vh;
  }
`;

export { PageLayoutContainer };
