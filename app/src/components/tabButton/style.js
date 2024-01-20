import styled from "styled-components";

const TabButtonContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  cursor: ${(props) => (props.isActive ? "default" : "pointer")};
  @media only screen and (min-width: 760px) {
    width: 150px;
    height: 30px;
  }
  @media only screen and (min-width: 1200px) {
    width: 150px;
    height: 30px;
  }
  @media only screen and (min-width: 1400px) {
    width: 150px;
    height: 30px;
  }
`;

const TabButtonIcon = styled.div`
  width: 50px;
  height: 50px;
  @media only screen and (min-width: 760px) {
    display: none;
  }
`;

const TabButtonText = styled.div`
  display: none;
  @media only screen and (min-width: 760px) {
    display: block;
  }
`;

export { TabButtonContainer, TabButtonIcon, TabButtonText };
