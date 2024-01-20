import styled from "styled-components";

const TabsContainer = styled.div`
  width: 300px;
  position: relative;
  height: 50px;
  @media only screen and (min-width: 760px) {
    height: 33px;
  }
`;

const TabsButtonsLayer = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 760px) {
    width: fit-content;
    height: 30px;
  }
`;

const TabsAnimationLayer = styled.div`
  width: auto;
  height: 3px;
  display: none;
  @media only screen and (min-width: 760px) {
    display: block;
  }
`;

const TabsAnimationSelection = styled.div`
  width: 150px;
  height: 3px;
  background-color: var(--activePrimary);
  position: absolute;
  left: ${(props) => props.left}px;
  transition: all 400ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
`;
export {
  TabsContainer,
  TabsButtonsLayer,
  TabsAnimationLayer,
  TabsAnimationSelection,
};
