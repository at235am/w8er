import React, { useState, useEffect } from "react";
import useWindowDimension from "../hooks/useWindowDimensions";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom component:
import Card from "../components/Card";
import FloorMapBackground from "../components/FloorMapBackground";

// illustrations:
import { ReactComponent as QueueDrawing } from "../assets/illustrations/queue.svg";
import { ReactComponent as DashboardDrawing } from "../assets/illustrations/dashboard.svg";
import Button from "../components/buttons/Button";
import { useHistory } from "react-router-dom";

const LPContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  /* height: 100%; */

  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* background-color: lightblue; */

  @media (max-width: ${30 * 2 + 5}rem) {
    /*  
      since display: flex; is causing flow issues at around this brekapoint
      we'll turn it back to the default display since we don't need the center
      that was achieved using flex box
     */
    display: block;
    width: auto;
  }
`;

const LPCard = styled(Card)`
  /* margin: auto 0; */
  position: relative;
  z-index: 10;

  align-items: center;

  svg {
    width: 70%;
    height: 50%;
  }

  @media (max-width: ${30 * 2 + 5}rem) {
    flex-direction: column;
    margin: auto;

    margin: ${({ height }) => (height - 560) / 2}px auto;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.onBackground};
  font-size: 2rem;
  font-weight: bold;

  margin-bottom: 1rem;
  width: 100%;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.onBackground};

  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  width: 100%;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: inherit;
  font-style: italic;
`;

const ButtonContainer = styled.div`
  width: 100%;

  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const LPButton = styled(Button)`
  border-radius: 3px;
  width: 100%;
  /* margin: 0 0.5rem; */
`;

const LandingPage = () => {
  const history = useHistory();
  const { width, height } = useWindowDimension();

  return (
    <LPContainer>
      {/* <LPCard
        height={height}
        css={css`
          margin-right: 2rem;
        `}
      >
        <QueueDrawing />
        <Title>Waitlist or Reservation</Title>
        <Text>
          Are you a <Highlight>customer</Highlight> trying to make a reservation
          or get your place in line?
        </Text>
        <Text>We can show you how!</Text>
        <ButtonContainer>
          <LPButton
            onClick={(e) => {
              e.stopPropagation();

              history.push("/customer-faq");
            }}
            text="Show me how!"
          />
        </ButtonContainer>
      </LPCard> */}

      <LPCard height={height}>
        <DashboardDrawing />
        <Title>Sign up for our services!</Title>
        <Text>
          Are you a <Highlight>restaurant professional</Highlight> looking to
          improve wait times for your customers?
        </Text>
        <Text>
          Use our services to manage your waitlists and reservations, allow your
          customers to pick out their seats, and much more!
        </Text>

        <ButtonContainer>
          <LPButton
            text="See features"
            css={css`
              margin-right: 2rem;
            `}
            onClick={(e) => {
              e.stopPropagation();

              history.push("/features");
            }}
          />

          <LPButton
            text="Sign Up"
            onClick={(e) => {
              e.stopPropagation();

              history.push("/register");
            }}
          />
        </ButtonContainer>
      </LPCard>
      {/* <FloorMapBackground /> */}
    </LPContainer>
  );
};

export default LandingPage;
