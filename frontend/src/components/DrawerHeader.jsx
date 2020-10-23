import React, { useState, useEffect, useRef } from "react";
import useResizeObserver from "use-resize-observer";

import ReactTooltip from "react-tooltip";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";

// icon:
// import { BsCaretDownFill } from "react-icons/bs";
import { CgOptions } from "react-icons/cg";
import { GoPlus } from "react-icons/go";

const contentPadding = 14; // measured in pixels

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100; // must be higher than everything else
  background-color: ${({ theme }) => theme.colors.background};

  box-shadow: inset 0px -1px 0px 0px ${({ theme }) => theme.colors.outline};

  width: 100%;
  height: 4.5rem;
  min-height: 4.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 0.5rem solid ${({ theme }) => theme.colors.surface};

  h1 {
    color: ${({ theme }) => theme.colors.onBackground};
    font-size: 1.2rem;
    text-transform: uppercase;

    /* font-style: italic; */
    letter-spacing: 2px;
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    white-space: nowrap;
  }
`;

const HeaderButton = styled(Button)`
  background-color: transparent;

  border-radius: 0;

  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  min-height: 4rem;

  .btn-icon {
    svg {
      width: 1.5rem;
      height: 1.5rem;
      transition: transform 200ms ease-out;
      transform: ${({ openContent, rotation = -180 }) =>
        openContent ? css`rotate(${rotation}deg)` : css`rotate(0)`};
      path {
        fill: ${({ openContent, theme }) =>
          !openContent ? theme.colors.onBackground : theme.colors.error};
      }
    }
  }

  &:hover {
    background-color: ${({ theme }) => rgba("black", 0.1)};
    .btn-icon {
      svg {
        path {
          fill: ${({ openContent, theme }) =>
            !openContent ? theme.colors.primary : theme.colors.error};
        }
      }
    }
  }
`;

const getDynamicPadding = () => {
  const paddingTop = contentPadding / 2;
  const paddingRight = contentPadding;
  const paddingBottom = contentPadding;
  const paddingLeft = contentPadding;

  const extraHeight = paddingTop + paddingBottom;
  const padding = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;

  return { extraHeight, padding };
};

const DrawerContent = styled.div`
  z-index: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  width: 100%;

  ${({ drawerStatus, headerHeight, height }) =>
    drawerStatus
      ? css`
          height: ${height + getDynamicPadding().extraHeight}px;
          min-height: ${height + getDynamicPadding().extraHeight}px;
          padding: ${getDynamicPadding().padding};
        `
      : css`
          height: 0;
          min-height: 0;
          padding: 0;
        `}

  border-bottom: ${({ theme, drawerStatus }) =>
    drawerStatus ? `1px solid ${theme.colors.outline}` : 0};

  & > * {
    color: ${({ theme }) => theme.colors.onBackground};
  }

  transition-property: min-height, height, padding;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  overflow: hidden;
`;

const DrawerHeader = ({
  headerTitle,
  drawerComponent1,
  drawerComponent2,
  handleChange1 = () => {},
  handleChange2 = () => {},
  ...props
}) => {
  const [drawerBtn1, setDrawerBtn1] = useState(false);
  const [drawerBtn2, setDrawerBtn2] = useState(false);

  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  const cr1 = useResizeObserver();
  const cr2 = useResizeObserver();

  const theme = useTheme();

  useEffect(() => {
    if (headerRef) setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  const toggleButton1 = () => {
    // console.log("toggling btn 1");
    setDrawerBtn1(!drawerBtn1);
    // handleChange1(!drawerBtn1);
  };

  const toggleButton2 = () => {
    // console.log("toggling btn 2");
    setDrawerBtn2(!drawerBtn2);
    // handleChange2(!drawerBtn2);
  };

  let newDrawerComponent1 = null;
  let newDrawerComponent2 = null;

  if (React.isValidElement(drawerComponent1)) {
    newDrawerComponent1 = React.cloneElement(drawerComponent1, {
      ref: cr1.ref,
      toggleDrawer: toggleButton1,
    });
  }

  if (React.isValidElement(drawerComponent2)) {
    newDrawerComponent2 = React.cloneElement(drawerComponent2, {
      ref: cr2.ref,
      toggleDrawer: toggleButton2,
    });
  }
  return (
    <React.Fragment>
      <HeaderContainer ref={headerRef}>
        <ReactTooltip
          id="drawer-header-btn"
          place="bottom"
          offset={{ bottom: 8 }}
          backgroundColor={theme.colors.primary}
          textColor="white"
          className="tooltip"
        />
        {newDrawerComponent1 && (
          <div className="btn-container">
            <HeaderButton
              data-tip="Options"
              data-for="drawer-header-btn"
              type="circle"
              openContent={drawerBtn1}
              buttonOpen={drawerBtn1}
              icon={CgOptions}
              // css={css`
              //   .btn-icon {
              //     svg {
              //       width: 1.5rem;
              //       height: 1.5rem;
              //     }
              //   }
              // `}
              onClick={() => {
                toggleButton1();
                setDrawerBtn2(false);
                // handleChange2(false);
              }}
            />
          </div>
        )}
        <h1>{headerTitle}</h1>
        {newDrawerComponent2 && (
          <div className="btn-container">
            <HeaderButton
              data-tip="Add Guest"
              data-for="drawer-header-btn"
              type="circle"
              addGuestOpen={drawerBtn2}
              openContent={drawerBtn2}
              rotation={-135}
              icon={GoPlus}
              onClick={() => {
                toggleButton2();
                setDrawerBtn1(false);
                // handleChange1(false);
              }}
            />
          </div>
        )}
      </HeaderContainer>

      {newDrawerComponent1 && (
        <DrawerContent
          headerHeight={headerHeight}
          drawerStatus={drawerBtn1}
          height={cr1.height}
        >
          {newDrawerComponent1}
        </DrawerContent>
      )}

      {newDrawerComponent2 && (
        <DrawerContent
          headerHeight={headerHeight}
          drawerStatus={drawerBtn2}
          height={cr2.height}
        >
          {newDrawerComponent2}
        </DrawerContent>
      )}
    </React.Fragment>
  );
};

export default DrawerHeader;
