import React from "react";
import { MenuContainer } from "./style";
import MenuItem from "../menuItem";
import { Link } from "react-router-dom";

const Menu = ({ data, activeMenu, setActiveMenu }) => {
  return (
    <MenuContainer>
      {data.map((item, index) => (
        <Link to={item.path} style={{ textDecoration: "none" }} key={index}>
          <MenuItem
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeMenu === item.id}
            onClick={() => setActiveMenu(item.id)}
          />
        </Link>
      ))}
    </MenuContainer>
  );
};

export default Menu;
