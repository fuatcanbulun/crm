import React from "react";
import "./style.css";
import BasicButton from "../../buttons/basicButton";
import IconButton from "../../buttons/iconButton";
import { AiOutlineClose } from "react-icons/ai";

const InformationModal = ({
  className,
  visibility,
  close,
  body,
  title,
  buttons,
}) => {
  return (
    <>
      {visibility && (
        <div className={`ui-information-modal ${className}`}>
          <div className="ui-information-modal-box">
            <div className="ui-information-modal-box-header">
              <span>{title}</span>
              <IconButton
                onClick={() => close()}
                icon={<AiOutlineClose size={20} />}
              />
            </div>
            <div className="ui-information-modal-box-body">{body}</div>
            <div className="ui-information-modal-box-footer">
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

export default InformationModal;
