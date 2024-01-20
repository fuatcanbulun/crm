import React from "react";
import "./style.css";
import BasicButton from "../../buttons/basicButton";
import IconButton from "../../buttons/iconButton";

const FormModal = ({ className, visibility, body, title, buttons }) => {
  return (
    <>
      {visibility && (
        <div className={`ui-form-modal ${className}`}>
          <div className="ui-form-modal-box">
            <div className="ui-form-modal-box-header">
              <span>{title}</span>
              <IconButton />
            </div>
            <div className="ui-form-modal-box-body">{body}</div>
            <div className="ui-form-modal-box-footer">
              {buttons.map((button) => (
                <BasicButton label={button.label} onClick={button.onClick} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
