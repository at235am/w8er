import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const MainContent = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;

  width: 100%;
  height: 100%;
  padding: 1rem;
  /* margin: 1rem; */

  overflow: auto;
  position: relative;

  & > * {
    color: ${({ theme }) => theme.colors.onBackground};
  }

  @media (max-width: 500px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;

    flex: 1;
  }

  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const Main = ({ children, ...props }) => {
  return <MainContent {...props}>{children}</MainContent>;
};

export default Main;