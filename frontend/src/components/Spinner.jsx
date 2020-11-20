import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

const size = 2;

const rotate360 = keyframes`

  from {
    transform: rotate(0);
    // border-radius: 0;
  }
  to {
    transform: rotate(360deg);
    // border-radius: 50%;
  }

`;

const SpinnerContainer = styled.div`
  width: ${size}rem;
  min-width: ${size}rem;
  max-width: ${size}rem;
  height: ${size}rem;
  min-height: ${size}rem;
  max-height: ${size}rem;

  background-color: ${({ theme }) => theme.colors.secondary};
  animation: ${rotate360} infinite 1s ease-in-out;
`;

const Spinner = () => {
  return <SpinnerContainer></SpinnerContainer>;
};

export default Spinner;
