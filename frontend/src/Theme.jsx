import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

// state management:
import { useRecoilValue } from "recoil";
import { themeState } from "./recoil/ThemeState";

// custom components:
import App from "./App";

// styling:
import { Global, css } from "@emotion/core";
import { ThemeProvider, useTheme } from "emotion-theming";

// export interface Theme {
//   colors: {
//     primary: String,
//     secondary: String,

//     background: String,
//     surface: String,

//     onPrimary: String,
//     onSecondary: String,

//     onBackground: String,
//     onSurface: String,

//     error: String,
//   };
//   font: Font;
//   breakpoints?: {
//     xs: String,
//     x: String,
//     m: String,
//     l: String,
//     xl: String,
//   };
// }

const baseFont = {
  size: "14px",
  family: "Noto Sans, sans-serif",
  weight: "normal",
};

const dimensions = {
  gridUnit: 20,
  navSize: "4rem",
};

const themeDark = {
  colors: {
    // primary: "#afb9f1",
    primary: "#6c63ff",
    secondary: "#5e89e6",
    // secondary: "#e87b9b",

    background: "#373e4d",
    surface: "#444c60",

    // onPrimary: "#373e4d",
    onPrimary: "white",
    onSecondary: "white",

    onBackground: "white",
    onSurface: "white",

    outline: "#575e70",

    error: "#ff6b6b",
    correct: "#37d7b2",
    warning: "#fee257",
  },
  font: baseFont,
  dimensions: dimensions,
};

const themeLight = {
  colors: {
    // primary: "#e87b9b",
    primary: "#54a0ff",
    secondary: "#6c63ff",

    // background: "#e5e5e5",
    background: "#f1f3f4",

    surface: "white",

    onPrimary: "white",
    onSecondary: "black",

    onBackground: "#3e3e3e",
    // onSurface: "#e5e5e5",
    onSurface: "#f1f3f4",

    outline: "#ebebeb",

    error: "#ff6b6b",
    correct: "#37d7b2",
    warning: "#fee257",
  },
  font: baseFont,
  dimensions: dimensions,
};

const GlobalReset = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;

          font-family: ${theme.font.family};
          font-size: ${theme.font.size};
          font-weight: ${theme.font.weight};
          color: ${theme.colors.onBackground};

          transition: background-color 250ms ease-out;
        }

        html {
          width: 100%;
          height: 100%;

          body {
            height: 100%;
            width: 100%;

            display: flex;
            flex-direction: column;

            #root {
              width: 100%;
              flex-grow: 1;

              /* CHANGE BG GRADIENTS HERE: */
              /* background: linear-gradient(
                45deg,
                rgba(28, 73, 219, 0.2) 0%,
                rgba(191, 96, 255, 0.2) 100%
              ); */

              /* OR */

              /* CHANGE BG COLOR HERE: */
              background-color: red;
            }
          }
        }

        a,
        a:link,
        a:visited,
        a:hover,
        a:active {
          cursor: pointer;
          text-decoration: none;
          color: ${theme.colors.primary};
        }

        ul,
        ol {
          list-style-type: none;
        }

        button {
          border: 0;
          cursor: pointer;
        }

        button:active,
        button:focus {
          outline: 0;
          /* outline: 1px solid red; */
        }

        input {
          border: 0;
          outline: 0;
        }
      `}
    />
  );
};

const ThemedApp = () => {
  // const darkTheme = useRecoilValue(themeState);
  const lightTheme = useRecoilValue(themeState);

  return (
    <ThemeProvider theme={lightTheme ? themeLight : themeDark}>
      <GlobalReset />
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default ThemedApp;
