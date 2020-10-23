import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
// import { ReactFlowProvider } from "react-flow-renderer";

import ReactTooltip from "react-tooltip";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";

// state management:
import { useRecoilState } from "recoil";
import { themeState } from "../recoil/ThemeState";
import { sidebarState } from "../recoil/SidebarState";
import { sidebarItem } from "../recoil/SidebarItem";

// custom components:
import Button from "./buttons/Button";
import ToggleButton from "./buttons/ToggleButton";
import Example from "./Example";
import GuestList from "./GuestList";
import FloorMapToolsDemo from "./FloorMapToolsDemo";
import FloorMapTools from "./FloorMapTools";
import Tool from "./layout-tools/Tool";

// icons:
import { MdChevronRight } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { BiCustomize } from "react-icons/bi";
import { CgDebug } from "react-icons/cg";

import "./tooltip.css";

const sbClosed = css`
  width: 0;
  min-width: 0;
  max-width: 0;

  @media (max-width: 500px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;

    height: 0;
    min-height: 0;
    max-height: 0;
  }
`;

const sbOpened = css`
  width: 25rem;
  min-width: 25rem;
  max-width: 25rem;

  @media (max-width: 500px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;

    min-height: 0;
    max-height: 65%; // needed for transition to take effect
  }
`;

const pointLeft = css`
  transform: rotate(-180deg);
`;
const pointRight = css`
  transform: rotate(0deg);
`;
const pointUp = css`
  transform: rotate(-90deg);
`;
const pointDown = css`
  transform: rotate(90deg);
`;

const sidebarItemStyles = css`
  margin-top: 1rem;
  @media (max-width: 500px) {
    margin-top: 0;
    margin-left: 1rem;
  }
`;

const SidebarNav = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  /* background-color: red; */

  z-index: 11;

  /* min-width: 4rem;
  max-width: 4rem; */
  display: flex;
  flex-direction: column;

  align-items: center;

  @media (max-width: 500px) {
    height: 4rem;
    min-height: 4rem;

    flex-direction: row;

    margin: 0 auto;
    border-right: none;
  }
`;

const SidebarContainer = styled.div`
  z-index: 10;
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};

  border-left: 1px solid ${({ theme }) => theme.colors.outline};
  @media (max-width: 500px) {
    border-left: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.outline};
  }

  ${({ sidebarOpen }) => (sidebarOpen ? sbOpened : sbClosed)}

  padding-bottom: ${({ sidebarOpen }) => (sidebarOpen ? "0.5rem" : 0)};
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;

  transition-property: max-width, min-width, max-height, min-height, padding;
  transition-duration: 250ms;
  transition-timing-function: ease-out;
`;

const navItemSelected = (props) => css`
  background-color: ${props.theme.colors.background};
  .btn-icon {
    svg {
      path {
        fill: ${props.theme.colors.primary};
      }
    }
  }
`;

const navBtnSize = ({ theme }) => css`
  width: 4rem;
  height: 4rem;
  border-radius: 0;
  background-color: transparent;

  .btn-icon {
    svg {
      path {
        fill: ${theme.colors.onBackground};
      }
    }
  }
`;

const ToggleSidebarButton = styled(Button)`
  ${navBtnSize}

  &:hover {
    ${navItemSelected}
  }

  .btn-icon {
    svg {
      width: 1.8rem;
      height: 1.8rem;

      transition: transform 250ms ease-out;

      ${({ sidebarOpen }) => (sidebarOpen ? pointLeft : pointRight)}
      @media (max-width: 500px) {
        ${({ sidebarOpen }) => (sidebarOpen ? pointUp : pointDown)}
      }
    }
  }
`;

const NavItemButton = styled(Button)`
  ${navBtnSize}

  /* ${sidebarItemStyles} */

  ${({ itemSelected, index }) =>
    itemSelected === index ? navItemSelected : null}
  
  .btn-icon {
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &:hover {
    ${navItemSelected}
  }
`;

const Slider = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 4rem;
  width: 3px;
  right: 0;
  position: absolute;

  transform: translateY(
    ${({ itemSelected }) => `${4 * (itemSelected + 1)}rem`}
  );

  transition: transform ease-out 200ms;

  @media (max-width: 500px) {
    height: 3px;
    width: 4rem;
    bottom: 0;
    left: 0;
    right: none;

    transform: translateX(
      ${({ itemSelected }) => `${4 * (itemSelected + 1)}rem`}
    );
  }
`;

const navItems = [
  {
    tooltip: "Manage Guest List",
    component: <GuestList />,
    // componentHeader: <FloorMapHeader />,
    icon: IoMdListBox,
    link: "/floor-map",
  },
  {
    // component: (
    //   <Tool
    //     info={{ id: "", data: {}, dropped: false, coordinates: { x: 0, y: 0 } }}
    //   />
    // ),
    tooltip: "Edit Floor Map",

    component: <FloorMapTools />,
    // componentHeader: <FloorMapHeader />,
    icon: BiCustomize,
    link: "/floor-map/edit",
  },
  {
    tooltip: "Settings",
    // component: <Button text="hello" />,
    // componentHeader: "<FriendslistSidebarHeader />",
    icon: MdSettings,
    link: "/settings",
  },
  // {
  //   component: <FloorMapToolsDemo />,
  //   // componentHeader: "<FriendslistSidebarHeader />",
  //   icon: CgDebug,
  // },
];

const Sidebar = ({ children, ...props }) => {
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarState);
  const [itemSelected, setItemSelected] = useRecoilState(sidebarItem);
  const theme = useTheme();

  const history = useHistory();

  const [themeToggle, toggleTheme] = useRecoilState(themeState);
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 500 ? false : true,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(max-width: 500px)");
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <React.Fragment>
      <SidebarNav className="sb-nav">
        <ReactTooltip
          id="nav-item-btn"
          place="right"
          offset={{ right: 15 }}
          backgroundColor={theme.colors.primary}
          textColor="white"
          className="tooltip"
        />
        <Slider itemSelected={itemSelected} />
        <ToggleSidebarButton
          type="circle"
          icon={MdChevronRight}
          onClick={() => {
            if (itemSelected === 2) {
              setItemSelected(0);
            }
            toggleSidebar();
          }}
          sidebarOpen={sidebarOpen}
        />
        {navItems.map((item, i) => (
          <div key={i}>
            <NavItemButton
              data-for="nav-item-btn"
              data-tip={item.tooltip}
              itemSelected={itemSelected}
              // settingsSelected={settingsSelected}
              index={i}
              type="circle"
              icon={item.icon}
              onClick={() => {
                if (itemSelected === i && item.component) {
                  toggleSidebar();
                } else if (item.component) {
                  openSidebar();
                } else {
                  closeSidebar();
                }
                setItemSelected(i);

                if (item.link || item.link !== "") history.push(item.link);
              }}
            />
          </div>
        ))}

        <ToggleButton
          orientation={`${mQuery.matches ? "horizontal" : "vertical"}`}
          label="theme"
          value={themeToggle}
          onClick={() => toggleTheme(!themeToggle)}
          css={sidebarItemStyles}
        />
      </SidebarNav>
      <SidebarContainer
        sidebarOpen={sidebarOpen}
        className="sb-container"
        css={sidebarOpen ? sbOpened : sbClosed}
      >
        {navItems[itemSelected].component}
      </SidebarContainer>
    </React.Fragment>
  );
};

export default Sidebar;
