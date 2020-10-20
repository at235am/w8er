import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

import FormInput from "../components/inputs/FormInput";

import { ReactComponent as WaitlistGraphic } from "../assets/illustrations/waitlist.svg";
import { ReactComponent as ReservationGraphic } from "../assets/illustrations/reserve.svg";
import { ReactComponent as RestaurantGraphic } from "../assets/illustrations/manage-res.svg";

import Login_Signup from "../pages/login_signup";

const LandingPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  cursor: pointer;
  margin: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  width: 30rem;
  height: 20rem;
  /* min-height: 40rem; */
  /* height: 40rem; */

  border-radius: 4px;

  text-align: center;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  svg {
    width: 15rem;
    height: 15rem;
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Heading = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.onSurface};
`;

const OverideFormInput = styled(FormInput)`
  input {
    background-color: ${({ theme }) => theme.colors.surface};
    color: red;
  }
`;

const LandingPage = () => {
  const history = useHistory();

  return (
    <LandingPageContainer>
      <Card
        className="card"
        onClick={() => {
          console.log("waitlist clicked");
          console.log(history);
          history.push("/waitlist");
        }}
      >
        <WaitlistGraphic />
        <Heading>Waitlist</Heading>
      </Card>
      <Card
        className="card"
        onClick={() => {
          console.log("Reserve clicked");
          console.log(history);
          history.push("/reservation");
        }}
      >
        <ReservationGraphic />
        <Heading>Reserve</Heading>
      </Card>
      <Card
        className="card"
        onClick={() => {
          console.log("Manage your restaurant clikced");
          history.push("/login_signup");
        }}
      >
        <RestaurantGraphic />

        <Heading>Manage your restaurant!</Heading>
      </Card>
    </LandingPageContainer>
  );
};

export default LandingPage;
