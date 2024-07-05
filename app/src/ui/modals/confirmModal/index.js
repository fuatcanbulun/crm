import React from "react";
import "./style.css";
import BasicButton from "../../buttons/basicButton";
import IconButton from "../../buttons/iconButton";
import { AiOutlineClose } from "react-icons/ai";

const ConfirmModal = ({
  className,
  visibility,
  close,
  message,
  title,
  buttons,
}) => {
  return (
    <>
      {visibility && (
        <div className={`ui-confirm-modal ${className}`}>
          <div className="ui-confirm-modal-box">
            <div className="ui-confirm-modal-box-header">
              <span>{title}</span>
              <IconButton
                onClick={() => close()}
                icon={<AiOutlineClose size={20} />}
              />
            </div>
            <div className="ui-confirm-modal-box-body">{message}</div>
            <div className="ui-confirm-modal-box-footer">
              {buttons.map((button) => (
                <BasicButton
                  label={button.label}
                  icon={button.icon}
                  onClick={button.onClick}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
