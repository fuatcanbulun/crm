import React, { useState } from "react";
import "./style.css";

const PhoneInput = ({ className, onChange, value }) => {
  const [maskedValue, setMaskedValue] = useState();

  function maskInput(input) {
    const cleanedInput = input.value.replace(/\D/g, "").slice(0, 10); // Sadece ilk 10 karakteri al
    let maskedNumber = "";

    if (cleanedInput.length <= 3) {
      maskedNumber = `(${cleanedInput.slice(0, 3)}`;
    } else if (cleanedInput.length <= 6) {
      maskedNumber = `(${cleanedInput.slice(0, 3)}) ${cleanedInput.slice(3)}`;
    } else if (cleanedInput.length <= 10) {
      maskedNumber = `(${cleanedInput.slice(0, 3)}) ${cleanedInput.slice(
        3,
        6
      )} ${cleanedInput.slice(6)}`;
    }

    setMaskedValue(maskedNumber);
  }

  return (
    <input
      value={maskedValue}
      className={`ui-text-input ${className}`}
      onChange={(e) => {
        onChange(e.target.value);
        maskInput(e.target);
      }}
    />
  );
};

export default PhoneInput;
