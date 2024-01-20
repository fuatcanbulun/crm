import React from "react";
import { IconContainer } from "./style";

import {
  AiOutlinePieChart,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { FiPlay, FiUser, FiMonitor, FiMapPin } from "react-icons/fi";

const icons = {
  AiOutlinePieChart: (size) => {
    return <AiOutlinePieChart size={size} />;
  },
  AiOutlineHeart: (size) => {
    return <AiOutlineHeart size={size} />;
  },
  AiFillHeart: (size) => {
    return <AiFillHeart size={size} />;
  },
  AiOutlineMenu: (size) => {
    return <AiOutlineMenu size={size} />;
  },
  FiPlay: (size) => {
    return <FiPlay size={size} />;
  },
  FiUser: (size) => {
    return <FiUser size={size} />;
  },
  FiMonitor: (size) => {
    return <FiMonitor size={size} />;
  },
  FiMapPin: (size) => {
    return <FiMapPin size={size} />;
  },
};

const sizes = {
  xs: 20,
  sm: 30,
  md: 40,
  lg: 50,
};

const Icon = ({ data, size, color }) => {
  return (
    <IconContainer color={color}>{icons[data](sizes[size])}</IconContainer>
  );
};

export default Icon;
