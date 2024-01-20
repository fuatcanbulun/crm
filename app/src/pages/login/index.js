import React, { useEffect, useState } from "react";
import { Post } from "../../services/requests";
import LoginLayout from "../../components/templates/loginLayout";
import LoginPanel from "../../components/loginPanel";

const Login = ({ setAuthorization }) => {
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSignUp = (values) => {
    console.log("values", values);

    if (values.password != values.passwordAgain) {
      alert("şifreler tutmuo");
    }

    Post(
      "users/signup",
      values,
      (response) => {
        console.log(response);
        setIsNewUser(false);
      },
      (error) => console.log(error)
    );
  };

  const handleLogin = (values) => {
    Post(
      "auth/login",
      values,
      (response) => {
        localStorage.setItem("access_token", response.accessToken);
        localStorage.setItem("refresh_token", response.refreshToken);
        setAuthorization(true);
      },
      (error) => console.log("error", error)
    );
  };

  return (
    <>
      <LoginLayout>
        <LoginPanel
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          setIsNewUser={setIsNewUser}
          isNewUser={isNewUser}
        />
      </LoginLayout>
    </>
  );
};

export default Login;
