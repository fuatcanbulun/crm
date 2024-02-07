import React, { useEffect, useState } from "react";
import { Post } from "../../services/requests";
// import LoginLayout from "../../components/templates/loginLayout";
// import LoginPanel from "../../components/loginPanel";
import TextInput from "../../ui/inputs/textInput";
import FormLabel from "../../ui/labels/formLabel";
import FormRow from "../../ui/rows/formRow";
import FormColumn from "../../ui/columns/formColumn";
import FormField from "../../ui/fields/formField";
import BasicButton from "../../ui/buttons/basicButton";
import { useTranslation } from "react-i18next";
import LoginPanel from "../../components/loginPanel";
import LandingLayout from "../../ui/layouts/landingLayout";

const Login = ({ setAuthorization }) => {
  const { t } = useTranslation();

  const [signUpFormValues, setSignUpFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const handleSignUp = () => {
    console.log("signUpFormValues", signUpFormValues);

    if (signUpFormValues.password != signUpFormValues.passwordAgain) {
      alert("şifreler tutmuo");
    }

    Post(
      "users/signup",
      signUpFormValues,
      (response) => {
        console.log(response);
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
    <LandingLayout>
      <LoginPanel handleLogin={handleLogin} />

      {/* <div style={{ width: "100%" }}>
        Sign Up
        <FormRow className="col-6">
          <FormColumn className="col-6">
            <FormField>
              <FormLabel label={t("first_name")} />
              <TextInput
                id="email"
                value={signUpFormValues.first_name}
                onChange={(val) =>
                  setSignUpFormValues({ ...signUpFormValues, first_name: val })
                }
              />
            </FormField>
            <FormField>
              <FormLabel label={t("last_name")} />
              <TextInput
                id="last_name"
                value={signUpFormValues.last_name}
                onChange={(val) =>
                  setSignUpFormValues({ ...signUpFormValues, last_name: val })
                }
              />
            </FormField>

            <FormField>
              <FormLabel label={t("email")} />
              <TextInput
                id="email"
                value={signUpFormValues.email}
                onChange={(val) =>
                  setSignUpFormValues({ ...signUpFormValues, email: val })
                }
              />
            </FormField>
            <FormField>
              <FormLabel label={t("password")} />
              <TextInput
                id="password"
                value={signUpFormValues.password}
                onChange={(val) =>
                  setSignUpFormValues({ ...signUpFormValues, password: val })
                }
              />
            </FormField>
            <FormField>
              <FormLabel label={t("passwordAgain")} />
              <TextInput
                id="password"
                value={signUpFormValues.passwordAgain}
                onChange={(val) =>
                  setSignUpFormValues({
                    ...signUpFormValues,
                    passwordAgain: val,
                  })
                }
              />
            </FormField>
          </FormColumn>
        </FormRow>
        <BasicButton label="Sign Up" onClick={handleSignUp} />
      </div> */}
    </LandingLayout>
  );
};

export default Login;
