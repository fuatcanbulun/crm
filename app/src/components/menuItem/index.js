import React from "react";
import { MenuItemContainer, MenuItemIcon, MenuItemText } from "./style";

import Text from "../text";
import Icon from "../icon";

const MenuItem = ({ label, icon, isActive, onClick }) => {
  return (
    <MenuItemContainer isActive={isActive} onClick={onClick}>
      {icon && (
        <MenuItemIcon>
          <Icon
            data={icon}
            size="sm"
            color={isActive ? "textWhite" : "textPrimary"}
          />
        </MenuItemIcon>
      )}
      <MenuItemText>
        <Text
          label={label}
          color={isActive ? "textWhite" : "textPrimary"}
          size="md"
        />
      </MenuItemText>
    </MenuItemContainer>
  );
};

export default MenuItem;
