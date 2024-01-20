import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const FormLabel = ({ label, className }) => {
  return <span className={`ui-form-label ${className}`}>{label}</span>;
};

export default FormLabel;
