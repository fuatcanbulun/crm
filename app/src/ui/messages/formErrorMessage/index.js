import React from "react";
import "./style.css";
import BasicButton from "../../buttons/basicButton";
import IconButton from "../../buttons/iconButton";
import { AiOutlineClose } from "react-icons/ai";
import { PiWarningFill } from "react-icons/pi";

const FormErrorMessage = ({ className, message }) => {
  return (
    <div className={`ui-form-error-message ${className}`}>
      <div className={`ui-form-error-message-icon`}>
        <PiWarningFill />
      </div>
      <div className={`ui-form-error-message-text`}>{message}</div>
    </div>
  );
};

export default FormErrorMessage;
