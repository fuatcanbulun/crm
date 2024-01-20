import styled from "styled-components";

const TopBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 760px) {
    display: none;
  }
`;

const TopBarLogo = styled.div`
  width: 60px;
  height: 50px;
  padding-left: 10px;
`;

const TopBarMenu = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justfiy-content: center;
  align-items: center;
`;

export { TopBarContainer, TopBarLogo, TopBarMenu };
