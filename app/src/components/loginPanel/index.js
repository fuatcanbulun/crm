import React, { useState } from "react";
import {
  LoginPanelContainer,
  LoginPanelColumn,
  LoginPanelLabel,
  LoginPanelInput,
  LoginPanelControls,
  LoginPanelBody,
  LoginPanelLogo,
} from "./style";
import Logo from "../logo";
import Space from "../space";
import Button from "../button";

const LoginPanel = ({ handleLogin, handleSignUp, setIsNewUser, isNewUser }) => {
  const [formValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  return (
    <LoginPanelContainer>
      <LoginPanelBody>
        <LoginPanelColumn>
          {isNewUser ? (
            <>
              <LoginPanelLabel>First Name</LoginPanelLabel>
              <LoginPanelInput
                onChange={(e) => {
                  setLoginValues({
                    ...formValues,
                    firstName: e.target.value,
                  });
                }}
              />
              <Space height={10} />
              <LoginPanelLabel>Last Name</LoginPanelLabel>
              <LoginPanelInput
                onChange={(e) => {
                  setLoginValues({
                    ...formValues,
                    lastName: e.target.value,
                  });
                }}
              />
            </>
          ) : (
            <LoginPanelLogo>
              <Logo type="login" />
            </LoginPanelLogo>
          )}
        </LoginPanelColumn>
        <LoginPanelColumn>
          <LoginPanelLabel>E-Mail</LoginPanelLabel>
          <LoginPanelInput
            onChange={(e) => {
              setLoginValues({
                ...formValues,
                email: e.target.value,
              });
            }}
          />
          <Space height={10} />
          <LoginPanelLabel>Password</LoginPanelLabel>
          <LoginPanelInput
            type="password"
            onChange={(e) => {
              setLoginValues({
                ...formValues,
                password: e.target.value,
              });
            }}
          />

          {isNewUser && (
            <>
              <Space height={10} />
              <LoginPanelLabel>Password Again</LoginPanelLabel>
              <LoginPanelInput
                onChange={(e) => {
                  setLoginValues({
                    ...formValues,
                    passwordAgain: e.target.value,
                  });
                }}
              />
            </>
          )}
        </LoginPanelColumn>
      </LoginPanelBody>
      <LoginPanelControls>
        <Button
          type="outlined"
          label={isNewUser ? "Cancel" : "Sign Up"}
          size="md"
          iconColor={"activePrimary"}
          onClick={() => setIsNewUser(!isNewUser)}
        />
        <Button
          label={isNewUser ? "Submit" : "Login"}
          size="md"
          iconColor={"activePrimary"}
          onClick={() =>
            isNewUser ? handleSignUp(formValues) : handleLogin(formValues)
          }
        />
      </LoginPanelControls>
    </LoginPanelContainer>
  );
};

export default LoginPanel;
