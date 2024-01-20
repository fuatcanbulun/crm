import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import IconCoinsLine from "../../assets/icons/icon-coins-line.svg";

const Menu = ({ data, className, isExtended }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState();
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  useEffect(() => {
    const allItems = [];
    const calculateAllItems = (data) => {
      for (const item of data) {
        if (item.children) {
          calculateAllItems(item.children);
        } else {
          allItems.push(item);
        }
      }
    };
    calculateAllItems(data);
    setActiveItem(allItems.find((item) => item.link == location.pathname)?.id);
  }, []);

  const handleNavigate = (id, link) => {
    setActiveItem(id);
    navigate(link);
  };

  const renderData = (data) => {
    return (
      <div className="ui-menu-data">
        {data.map((item) => (
          <div className="ui-menu-item">
            <div
              className={`ui-menu-item-content ${
                activeItem == item.id ? "ui-menu-item-active" : ""
              }`}
              onClick={() =>
                item.children
                  ? setSelectedSubMenu(
                      selectedSubMenu == item.id ? null : item.id
                    )
                  : handleNavigate(item.id, item.link)
              }
            >
              <div className="ui-menu-item-icon">{item.icon}</div>
              <span className="ui-menu-item-label">{item.label}</span>
            </div>
            {item.children && (
              <div
                className="ui-sub-menu"
                style={{
                  height:
                    selectedSubMenu == item.id ||
                    item.children.find((item) => item.id == activeItem)
                      ? item.children.length * 40
                      : 0,
                }}
              >
                {renderData(item.children)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`ui-menu ${isExtended ? "ui-menu-extended" : ""} ${className}`}
    >
      {renderData(data)}
    </div>
  );
};

export default Menu;
