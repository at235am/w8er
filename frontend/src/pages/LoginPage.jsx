import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import Input from "../components/inputs/Input";
import Card from "../components/Card";
import Button from "../components/buttons/Button";
import ErrorMessage from "../components/ErrorMessage";

import { useAuth } from "../contexts/AuthContext";

const INITIAL_ACC_INFO = {
  restaurantName: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
  settings: {
    capacity: 50,
  },
};

const LoginContainer = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled(Card)`
  @media (max-width: 500px) {
    width: 90%;
    padding: 1rem;
    /* background-color: red; */
  }
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;

const SpacedInput = styled(Input)`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  min-height: 3.5rem;
  height: 3.5rem;
  max-height: 3.5rem;
  margin-top: 1rem;
`;

const LoginPage = () => {
  // const [user, setUser] = useRecoilState(userState);
  const { register, handleSubmit, errors, watch } = useForm();
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const emailReqs = {
    required: { value: true, message: "email required" },
    validate: (value) => value.includes("@") || "email requires an @",
  };

  const passwordReqs = {
    required: { value: true, message: "password required" },
    minLength: { value: 8, message: "8 or more characters" },
  };

  const onSubmit = (data) => {
    setAuthError("");
    setLoading(true);
    auth
      .login(data.email, data.password)
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setAuthError("Invalid email or password");
        setLoading(false);
      });
  };

  return (
    <LoginContainer>
      <LoginCard>
        {/* noValidate disables the html5 validation and its ugly messages */}

        <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
          <SpacedInput
            type="email"
            htmlFor="email"
            label="email"
            name="email"
            ref={register(emailReqs)}
            error={errors.email && errors.email.message}
          />

          <SpacedInput
            type="password"
            htmlFor="password"
            label="password"
            name="password"
            ref={register(passwordReqs)}
            error={errors.password && errors.password.message}
          />

          <ButtonContainer>
            {authError && <ErrorMessage text={authError} />}
            <SubmitButton
              type="submit"
              text="login"
              disabled={loading}
              spinner={loading}
            />
          </ButtonContainer>
        </FormContainer>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
