import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// state management:
import { useRecoilValue, useRecoilState } from "recoil";
import { sidebarState } from "../recoil/SidebarState";
import { sidebarItem } from "../recoil/SidebarItem";

// icons:
import { MdSettings } from "react-icons/md";

const OverlayContainer = styled.div`
  position: relative;
  z-index: 30;
  width: 100%;
  /* width: 10rem; */
  height: 4rem;
  background-color: transparent;

  /* padding: 1rem; // need padding (plus the extra div) to account for weird margin (on the right) issue on mobile */

  @media (max-width: 500px) {
    ${({ sidebar }) =>
      sidebar
        ? css`
            display: none;
          `
        : null}
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  /* border-radius: 3px; */

  width: 100%;
  height: 100%;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  /* background-color: lightblue; */
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.5rem;
    width: 1.6rem;
    height: 1.6rem;
    path {
      fill: ${({ theme }) => theme.colors.onBackground};
    }
  }
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.onBackground};
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const highlight = ({ theme }) => css`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  letter-spacing: 2px;
  /* color: ${theme.colors.surface}; */
  color: white;
`;

const LiveHighlight = styled.span`
  ${highlight}
  background-color: ${({ theme }) => theme.colors.correct};
`;

const EditHighlight = styled.span`
  ${highlight}

  background-color: ${({ theme }) => theme.colors.error};
`;

const NeutralHighlight = styled.span`
  ${highlight}

  cursor: pointer;
  /* font-weight: normal; */

  color: ${({ theme }) => theme.colors.onBackground};

  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    /* font-weight: bold; */
  }
`;

const Overlay = () => {
  const history = useHistory();
  const sidebarOpen = useRecoilValue(sidebarState);
  const [sbItem, setSbItem] = useRecoilState(sidebarItem);

  useEffect(() => {
    console.log("polo");
  });

  return (
    <OverlayContainer sidebar={sidebarOpen} className="overlay">
      <Content>
        <HeaderWrapper>
          {history.location.pathname === "/floor-map" && (
            <Header>
              Floor Map:<LiveHighlight>live</LiveHighlight>
              <NeutralHighlight
                onClick={() => {
                  setSbItem(1);
                  history.push("/floor-map/edit");
                }}
              >
                edit
              </NeutralHighlight>
            </Header>
          )}

          {history.location.pathname === "/floor-map/edit" && (
            <Header>
              Floor Map:
              <NeutralHighlight
                onClick={() => {
                  setSbItem(0);
                  history.push("/floor-map");
                }}
              >
                live
              </NeutralHighlight>
              <EditHighlight>edit</EditHighlight>
            </Header>
          )}

          {history.location.pathname === "/settings" && (
            <React.Fragment>
              <Header>Settings</Header>

              <MdSettings />
            </React.Fragment>
          )}
        </HeaderWrapper>
      </Content>
    </OverlayContainer>
  );
};

export default Overlay;
