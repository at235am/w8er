import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link, useHistory, useLocation } from "react-router-dom";

// illustrations:
import { ReactComponent as Logo } from "../assets/w8r-logo.svg";

const NavBarContainer = styled.nav`
  position: relative;

  width: 100%;
  min-height: 4rem;
  height: 4rem;
  max-height: 4rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outline};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavListWrapper = styled.div`
  /* background-color: red; */
  height: 100%;
  /* flex: 1; */
`;

const NavList = styled.ul`
  /* background-color: green; */
  /* width: 80%; */
  margin: 0 auto;
  position: relative;
  height: 100%;

  display: flex;
  justify-content: center;
`;

const NavItem = styled.li`
  /* background-color: red; */

  height: 100%;
`;

const StyledLink = styled(Link)`
  height: 100%;
  /* padding: 0 1rem; */
  width: 6rem;
  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.outline};
  }
`;

const Slider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 6rem;
  background-color: ${({ theme }) => theme.colors.primary};

  transform: translateX(${({ itemSelected }) => `${6 * itemSelected}rem`});

  transition: transform 200ms ease-in-out;
`;

const StyledLogo = styled(Logo)`
  position: absolute;
  /* width: 5rem; */
  margin: 0 0.5rem;
  width: 6rem;
  height: 80%;
  left: 0;
`;

const NavigationBar = () => {
  const [itemSelected, setItemSelected] = useState(0);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setItemSelected(0);
        break;
      case "/customer-faq":
        setItemSelected(1);
        break;
      case "/register":
        setItemSelected(2);
        break;
      case "/login":
        setItemSelected(3);
        break;
      default:
        setItemSelected(0);
        break;
    }
  }, [location]);

  return (
    <NavBarContainer>
      <StyledLogo />
      <NavListWrapper
      // onClick={() => console.log("test", location, itemSelected)}
      >
        <NavList>
          <Slider itemSelected={itemSelected} />
          <NavItem>
            <StyledLink to="/">Services</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/customer-faq">Guests</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/register">Register</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/login">Login</StyledLink>
          </NavItem>
        </NavList>
      </NavListWrapper>
    </NavBarContainer>
  );
};

export default NavigationBar;
