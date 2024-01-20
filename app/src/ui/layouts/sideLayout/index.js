import React, { useState } from "react";
import "./style.css";
import Menu from "../../menu";
import IconCoinsLine from "../../../assets/icons/icon-coins-line.svg";

const SideLayout = ({ className, menuData, isExtended, setIsExtended }) => {
  return (
    <div
      className={`ui-side-layout ${
        isExtended ? "ui-side-layout-extended" : ""
      } ${className}`}
    >
      <div
        className="ui-side-layout-logo"
        onClick={() => setIsExtended(!isExtended)}
      >
        <img src={IconCoinsLine} />
      </div>

      <Menu data={menuData} isExtended={isExtended} />
    </div>
  );
};

export default SideLayout;
