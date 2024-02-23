import React from "react";
import "./style.css";
import { FaBars } from "react-icons/fa";
import IconButton from "../../buttons/iconButton";

const HeaderLayout = ({ className, children, isExtended, setIsExtended }) => {
  return (
    <div className={`ui-header-layout ${className}`}>
      <IconButton
        className={`ui-header-layout-menu-button ${
          isExtended ? "ui-header-layout-menu-button-extended" : ""
        }`}
        onClick={() => setIsExtended(!isExtended)}
        icon={<FaBars />}
      />
    </div>
  );
};

export default HeaderLayout;
