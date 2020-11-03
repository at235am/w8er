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
  /* background-color: red; */

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

const ContentContainer = styled.div`
  width: 80%;
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
const LargeText = styled.p`
  color: ${({ theme }) => theme.colors.onBackground};

  font-size: 4rem;
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
      <ContentContainer>
        <LargeText>A customer management solution with no rivals.</LargeText>
      </ContentContainer>
    </LPContainer>
  );
};

export default LandingPage;
