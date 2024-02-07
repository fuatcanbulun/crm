import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import IconCoinsLine from "../../assets/icons/icon-coins-line.svg";
import { useSelector } from "react-redux";

import { AiOutlineWarning, AiOutlineCheckCircle } from "react-icons/ai";

const ToastMessage = ({ className }) => {
  const { messages } = useSelector((state) => state.toastMessage);

  return (
    <div className={`ui-toast-message ${className}`}>
      {messages.map((item) => (
        <div
          className={`ui-toast-message-item ui-toast-message-item-${item.type}`}
        >
          <div className="ui-toast-message-item-left">
            {item.type == "success" && <AiOutlineCheckCircle />}
            {item.type == "error" && <AiOutlineWarning />}
          </div>
          <div className="ui-toast-message-item-right">
            <span className="ui-toast-message-item-title">{item.title}</span>
            <span className="ui-toast-message-item-text">{item.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastMessage;
