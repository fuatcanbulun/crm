import React from "react";
import { TopBarContainer, TopBarLogo, TopBarMenu } from "./style";
import Logo from "../logo";
import Icon from "../icon";

const TopBar = ({ sideBarVisibility, setSideBarVisibility }) => {
  return (
    <TopBarContainer>
      <TopBarLogo>
        <Logo />
      </TopBarLogo>
      <TopBarMenu onClick={() => setSideBarVisibility()}>
        <Icon data="AiOutlineMenu" size="sm" color="textSecondary" />
      </TopBarMenu>
    </TopBarContainer>
  );
};

export default TopBar;
