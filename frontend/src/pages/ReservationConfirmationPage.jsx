import React, { useState } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

import styled from "@emotion/styled";
import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";

import {ReactComponent as ReserveGraphic} from "../assets/illustrations/reserveConfirm.svg";

import { useHistory } from "react-router-dom";

import Select from "react-select";

const RContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};

  width: 50%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  svg {
    width: 20 rem;
    height: 20rem;
  }

  box-shadow: 3px 5px 10px white;
`;


const Title = styled.h1`
  font-size: 3em;
  text-align: flex-start;
  flex-direction: row;
  color: palevioletred;
`;


const ReservationConfirmationPage = () => {
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
 

  return (
    <RContainer>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
       
          history.push("/");
        }}
      >
        
    <Title>Can't wait to see you!</Title>

    <ReserveGraphic/>
        
    <Button type="submit" text="Take me back!"></Button>
      
      </FormContainer>
    </RContainer>
  );
};
export default ReservationConfirmationPage;
