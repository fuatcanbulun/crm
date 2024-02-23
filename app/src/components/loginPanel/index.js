import React, { useState } from "react";
import FormLabel from "../../ui/labels/formLabel";
import FormField from "../../ui/fields/formField";
import TextInput from "../../ui/inputs/textInput";
import BasicButton from "../../ui/buttons/basicButton";
import { useTranslation } from "react-i18next";
import { AiOutlineLogin } from "react-icons/ai";
import "./style.css";
import Logo from "../../assets/images/logo-md-positive.png";

const LoginPanel = ({ handleLogin }) => {
  const { t } = useTranslation();

  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {
    handleLogin(loginFormValues);
  };

  return (
    <div className="comp-login-panel">
      <div className="comp-login-panel-left">
        <img src={Logo} />
      </div>
      <div className="comp-login-panel-right">
        <FormField>
          <FormLabel label={t("email")} />
          <TextInput
            id="email"
            value={loginFormValues.email}
            onChange={(val) =>
              setLoginFormValues({ ...loginFormValues, email: val })
            }
          />
        </FormField>
        <FormField className="mt10">
          <FormLabel label={t("password")} />
          <TextInput
            type="password"
            id="password"
            value={loginFormValues.password}
            onChange={(val) =>
              setLoginFormValues({ ...loginFormValues, password: val })
            }
          />
        </FormField>
        <div className="comp-login-panel-right-buttons">
          <BasicButton
            className="mt20"
            label={t("login")}
            icon={<AiOutlineLogin />}
            onClick={() => onLogin()}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
