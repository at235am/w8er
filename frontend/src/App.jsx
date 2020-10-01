import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

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

// page components:
import SeatingLayout from "./pages/SeatingLayout";
import Settings from "./pages/Settings";

// icons:
import { MdBrightnessLow } from "react-icons/md";
import { SiGoogle as GoogleLogoIcon } from "react-icons/si";

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

const App = ({ ...props }) => {
  const theme = useTheme();

  useEffect(() => {
    console.log("UE1");
  }, [theme]);

  return (
    <AppContainer>
      <Helmet>
        <meta name="theme-color" content={theme.colors.primary} />
      </Helmet>

      <BrowserRouter>
        <Sidebar>
          <Switch>
            <Route exact path="/" component={SeatingLayout} />
            <Route exact path="/seating-layout" component={SeatingLayout} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </Sidebar>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
