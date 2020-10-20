import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { useRecoilState } from "recoil";
import { userState } from "../recoil/UserState";

const MainContent = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
  /* background-color: red; */
  /* z-index: 1; */

  width: 100%;
  /* height: 100%; */
  max-height: calc(100% - 4rem);
  /* flex: 1; */

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
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;

const Main = ({ children, ...props }) => {
  const [user, setUser] = useRecoilState(userState);

  return <MainContent {...props}>{children}</MainContent>;
};

export default Main;
