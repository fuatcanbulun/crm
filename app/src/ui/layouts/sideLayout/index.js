import React, { useState } from "react";
import "./style.css";
import Menu from "../../menu";
import IconCoinsLine from "../../../assets/icons/icon-coins-line.svg";
import LogoMd from "../../../assets/images/logo-md.png";
import LogoSm from "../../../assets/images/logo-sm.png";

const SideLayout = ({ className, menuData, isExtended }) => {
  return (
    <div
      className={`ui-side-layout ${
        isExtended ? "ui-side-layout-extended" : ""
      } ${className}`}
    >
      {isExtended && (
        <div className="ui-side-layout-logo">
          <img src={LogoMd} />
        </div>
      )}

      <Menu data={menuData} isExtended={isExtended} />
    </div>
  );
};

export default SideLayout;
