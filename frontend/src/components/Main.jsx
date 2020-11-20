import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { sidebarNav } from "../recoil/SidebarNav";

const MainContent = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;

  width: calc(100% - ${({ sidebarNavOpen }) => (sidebarNavOpen ? 9 : 4)}rem);
  height: 100%;

  /* flex: 1; */
  /* padding: 1rem; */
  /* margin: 1rem; */

  overflow: hidden;
  position: absolute;
  top: 0;
  left: ${({ sidebarNavOpen }) => (sidebarNavOpen ? 9 : 4)}rem;

  & > * {
    color: ${({ theme }) => theme.colors.onBackground};
  }

  @media (max-width: 900px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;

    height: calc(100% - 4rem);

    flex: 1;

    top: 4rem;
    left: 0;
  }

  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const Main = ({ children, ...props }) => {
  const sidebarNavOpen = useRecoilValue(sidebarNav);
  return (
    <MainContent sidebarNavOpen={sidebarNavOpen} {...props}>
      {children}
    </MainContent>
  );
};

export default Main;
