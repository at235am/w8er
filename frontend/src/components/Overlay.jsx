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

// logo:

import { ReactComponent as Logo } from "../assets/w8r-logo.svg";
import { SaveButtonState } from "../recoil/SaveButtonState";
import { ChangeDetectedState } from "../recoil/ChangeDetectedState";

import Button from "./buttons/Button";
import Spinner from "./Spinner";

const OverlayContainer = styled.div`
  position: relative;
  z-index: 30;
  width: 100%;
  /* width: 10rem; */
  height: 4rem;
  /* background-color: red; */

  /* padding: 1rem; // need padding (plus the extra div) to account for weird margin (on the right) issue on mobile */

  display: flex;
  justify-content: center;
  align-items: center;

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
  border-radius: 10rem;
  padding: 0 1.5rem;

  /* width: 100%; */
  height: 70%;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  /* border: 1px solid ${({ theme }) => theme.colors.outline}; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  /* background-color: lightblue; */
  flex: 1;

  display: flex;
  justify-content: center;
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

  display: flex;
  justify-content: center;
  align-items: center;
`;
const LiveEditToggleWrapper = styled.div`
  display: flex;
  border-radius: 5rem;
  overflow: hidden;
  margin-left: 1rem;
`;
const highlight = ({ theme }) => css`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
  padding: 0.25rem 1rem;
  letter-spacing: 2px;
  /* color: ${theme.colors.surface}; */
  color: white;
  /* padding: 0 0.5rem; */
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

const StyledLogo = styled(Logo)`
  height: 100%;
  width: 6rem;
  margin-right: 0.5rem;

  #w1,
  #eight,
  #r {
    fill: ${({ theme }) => theme.colors.primary};

    circle,
    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }

  #w2,
  #w3 {
    fill: ${({ theme }) => theme.colors.onBackground};
  }
`;

const Overlay = () => {
  const history = useHistory();
  const sidebarOpen = useRecoilValue(sidebarState);
  const [sbItem, setSbItem] = useRecoilState(sidebarItem);
  // const [saveLoading, setSaveLoading] = useRecoilState(SaveButtonState);
  // const [changedDetected, setChangedDetected] = useRecoilState(
  //   ChangeDetectedState
  // );

  useEffect(() => {
    // console.log("polo");
  });

  return (
    <React.Fragment>
      <OverlayContainer sidebar={sidebarOpen} className="overlay">
        <Content>
          <HeaderWrapper>
            {history.location.pathname === "/floor-map" && (
              <Header>
                Floor Map:
                <LiveEditToggleWrapper>
                  <LiveHighlight>live</LiveHighlight>
                  <NeutralHighlight
                    onClick={() => {
                      setSbItem(1);
                      history.push("/floor-map/edit");
                    }}
                  >
                    edit
                  </NeutralHighlight>
                </LiveEditToggleWrapper>
              </Header>
            )}

            {history.location.pathname === "/floor-map/edit" && (
              <Header>
                Floor Map:
                <LiveEditToggleWrapper>
                  <NeutralHighlight
                    onClick={() => {
                      setSbItem(0);
                      history.push("/floor-map");
                    }}
                  >
                    live
                  </NeutralHighlight>
                  <EditHighlight>edit</EditHighlight>
                </LiveEditToggleWrapper>
              </Header>
            )}

            {history.location.pathname === "/settings" && (
              <React.Fragment>
                <Header>Settings</Header>

                <MdSettings />
              </React.Fragment>
            )}
          </HeaderWrapper>
          {/* <StyledLogo /> */}
        </Content>
      </OverlayContainer>
      {/* <BottomOverlay>
        {changedDetected && (
          <NotificationText>You have unsaved changes</NotificationText>
        )}
      </BottomOverlay> */}
    </React.Fragment>
  );
};

export default Overlay;
