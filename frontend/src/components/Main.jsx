import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const MainContent = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
  background-color: red;
  /* z-index: 1; */

  width: 100%;
  height: 100%;

  /* overflow: hidden; */

  & > * {
    color: ${({ theme }) => theme.colors.onBackground};
  }

  @media (max-width: 500px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;

    flex: 1;

    top: 4rem;
    left: 0;
  }

  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const Main = ({ children, ...props }) => {
  return <MainContent {...props}>{children}</MainContent>;
};

export default Main;
