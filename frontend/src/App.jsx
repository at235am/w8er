import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

import { DndProvider } from "react-dnd-multi-backend";
// import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ReactFlowProvider } from "react-flow-renderer";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import styled from "@emotion/styled";

// custom components:
import ToggleButton from "./components/buttons/ToggleButton";
import Button from "./components/buttons/Button";
import FormInput from "./components/inputs/FormInput";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import FloorMapEdit from "./components/layout-tools/FloorMapEdit";
import FloorMap from "./components/layout-tools/FloorMap";
import Overlay from "./components/Overlay";

// page components:
import SeatingLayout from "./pages/SeatingLayout";
import Settings from "./pages/Settings";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CustomerFAQPage from "./pages/CustomerFAQPage";
import FeaturesPage from "./pages/FeaturesPage";
import WaitListReservePage from "./pages/WaitlistReservePage";

// icons:
import { MdBrightnessLow } from "react-icons/md";
import { SiGoogle as GoogleLogoIcon } from "react-icons/si";
import LandingPage from "./pages/LandingPage";

// state management:
import { useRecoilValue } from "recoil";
import { userState } from "./recoil/UserState";
import { useAuth } from "./contexts/AuthContext";
import NavigationBar from "./components/NavigationBar";
import ConfirmationPage from "./pages/ConfirmationPage";

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
    },
    {
      backend: TouchBackend, // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition,
    },
  ],
};

const AppContainer = styled.section`
  background-color: ${(props) => props.theme.colors.background};

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;

  height: 100%;

  display: flex;
  flex-direction: column;

  & > * {
    flex-grow: 1;
  }
`;

const FlexWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};

  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: row;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const App = ({ ...props }) => {
  const theme = useTheme();
  const { currentUser } = useAuth();

  useEffect(() => {
    // console.log("UE1");
  }, [theme]);

  return (
    // <DndProvider backend={HTML5Backend}>
    <DndProvider options={HTML5toTouch}>
      {/* <DndProvider backend={MultiBackend} options={HTML5toTouch}> */}
      <ReactFlowProvider>
        <AppContainer>
          <Helmet>
            <meta name="theme-color" content={theme.colors.primary} />
          </Helmet>

          <BrowserRouter>
            {currentUser && (
              <FlexWrapper>
                <Sidebar />
                <Main>
                  <Switch>
                    <Route exact path="/floor-map" component={FloorMap} />
                    <Route
                      exact
                      path="/floor-map/edit"
                      component={FloorMapEdit}
                    />
                    <Route exact path="/settings" component={Settings} />
                    {/* <Route
                      exact
                      path="/r/:id"
                      component={WaitListReservePage}
                    /> */}

                    <Route path="/">
                      {!currentUser.restaurant ? (
                        <Redirect to="/floor-map" />
                      ) : (
                        <Redirect to="/settings" />
                      )}
                    </Route>
                  </Switch>
                </Main>
                <Overlay />
                <div
                  id="notification"
                  css={css`
                    /* background-color: #fff; */
                    width: 100%;
                    /* height: 2rem; */
                    position: fixed;
                    bottom: 0;
                    z-index: 100;
                  `}
                ></div>
              </FlexWrapper>
            )}

            {!currentUser && (
              <React.Fragment>
                <NavigationBar />
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/register" component={RegisterPage} />
                  <Route exact path="/login" component={LoginPage} />
                  {/* <Route path="/r/:id" component={LoginPage} /> */}

                  <Route
                    exact
                    path="/customer-faq"
                    component={CustomerFAQPage}
                  />
                  <Route exact path="/features" component={FeaturesPage} />
                  <Route
                    exact
                    path="/miles-steakhouse"
                    component={WaitListReservePage}
                  />

                  <Route path="/r/:id" component={WaitListReservePage} />
                  <Route path="/c/:id" component={ConfirmationPage} />

                  <Route path="/">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </React.Fragment>
            )}
          </BrowserRouter>
        </AppContainer>
      </ReactFlowProvider>
    </DndProvider>
  );
};

export default App;
