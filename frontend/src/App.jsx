import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import styled from "@emotion/styled";

// styling from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// custom components:
import ToggleButton from "./components/buttons/ToggleButton";
import Button from "./components/buttons/Button";
import FormInput from "./components/inputs/FormInput";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Navigation from "./components/Navigation";

// page components:
import SeatingLayout from "./pages/SeatingLayout";
import Settings from "./pages/Settings";
import Login_Signup from "./pages/login_signup";
import Guestlist_Floormap from "./pages/Guest_Floormap";
// import index from "./pages/index";
import Waitlist from "./pages/Waitlist";
import Confirmation from "./pages/Confirmation";

// icons:
import { MdBrightnessLow } from "react-icons/md";
import { SiGoogle as GoogleLogoIcon } from "react-icons/si";
import WaitlistPage from "./pages/WaitlistPage";
import FloorMap from "./components/layout-tools/FloorMap";
import ReservationPage from "./pages/ReservationPage";
import ReservationConfirmationPage from "./pages/ReservationConfirmationPage";

// state management:
import { useRecoilValue } from "recoil";
import { userState } from "./recoil/UserState";

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

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const App = ({ ...props }) => {
  const theme = useTheme();
  const user = useRecoilValue(userState);

  useEffect(() => {
    console.log("UE1");
  }, [theme]);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <Helmet>
          <meta name="theme-color" content={theme.colors.primary} />
        </Helmet>

        <BrowserRouter>
          {!user && (
            <Main>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/reservation" component={ReservationPage} />
                <Route
                  exact
                  path="/reservation-choose-table"
                  component={FloorMap}
                />
                <Route exact path="/login_signup" component={Login_Signup} />
                <Route exact path="/waitlist" component={Waitlist} />
                <Route exact path="/confirmation" component={Confirmation} />
                <Route
                  exact
                  path="/reservation-confirmation"
                  component={ReservationConfirmationPage}
                />
              </Switch>
            </Main>
          )}
          {user && (
            <Switch>
              <Route exact path="/login_signup" component={Login_Signup} />
              <Route exact path="/waitlist" component={Waitlist} />
              <Route exact path="/confirmation" component={Confirmation} />
              <Route exact path="/settings" component={Settings} />
              <Route
                exact
                path="/guestlist_floormap"
                component={Guestlist_Floormap}
              />
            </Switch>
          )}
        </BrowserRouter>
      </AppContainer>
    </DndProvider>
  );
};

export default App;
