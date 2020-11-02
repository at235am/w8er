import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import Input from "../components/inputs/Input";
import Card from "../components/Card";
import Button from "../components/buttons/Button";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/UserState";
import { Link } from "react-router-dom";

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

const RegisterContainer = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterCard = styled(Card)`
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

const RegisterButton = styled(Button)`
  width: 100%;
  min-height: 3.5rem;
  height: 3.5rem;
  max-height: 3.5rem;
  margin-top: 1rem;
`;

const RegisterPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const { register, handleSubmit, errors, watch } = useForm();

  const resNameReqs = {
    required: { value: true, message: "name required" },
  };

  const emailReqs = {
    required: { value: true, message: "email required" },
    validate: (value) => value.includes("@") || "email requires an @",
  };

  const passwordReqs = {
    required: { value: true, message: "password required" },
    minLength: { value: 8, message: "8 or more characters" },
  };

  const confirmPwReqs = {
    validate: (value) =>
      value === watch("password") || "passwords do not match",
  };

  const onSubmit = (data) => setUser(data);

  return (
    <RegisterContainer>
      <RegisterCard>
        {/* noValidate disables the html5 validation and its ugly messages */}

        <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
          <SpacedInput
            type="text"
            htmlFor="restaurant"
            label="restaurant name"
            name="restaurant"
            ref={register(resNameReqs)}
            error={errors.restaurant && errors.restaurant.message}
          />

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

          <SpacedInput
            type="password"
            htmlFor="confirmPassword"
            label="confirm password"
            name="confirmPassword"
            ref={register(confirmPwReqs)}
            error={errors.confirmPassword && errors.confirmPassword.message}
            onClick={() => console.log(errors)}
          />
          <ButtonContainer>
            <RegisterButton
              text="skip"
              onClick={(e) => {
                e.preventDefault();
                setUser({ sdljt: "" });
              }}
            />
            <RegisterButton type="submit" text="register" />
          </ButtonContainer>
        </FormContainer>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterPage;
