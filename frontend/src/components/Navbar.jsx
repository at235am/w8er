import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { rgba } from "emotion-rgba";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../recoil/UserState";

const NavbarContainer = styled.div`
  width: 100%;

  height: 4rem;
  min-height: 4rem;
  max-height: 4rem;

  background-color: ${({ theme }) => theme.colors.primary};

  display: flex;
  justify-content: flex-end;
  align-items: center;

  /* @media (max-width: 768px) {
    background-color: #fff;
  } */
`;

const NavList = styled.ul`
  display: flex;
  height: 100%;
  margin-bottom: 0; // overriding bootstrap
`;

const NavItem = styled.li`
  height: 100%;

  a {
    height: 100%;

    padding: 0 1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: ${rgba("white", 0.5)};
    }
  }
`;

const doAppear = (user) => !!user;
const dontAppear = (user) => !!!user;
const alwaysAppear = (user) => true;

const INITIAL_NAV_LIST = [
  { name: "home", path: "/", appear: alwaysAppear },
  { name: "waitlist", path: "/waitlist", appear: dontAppear },
  { name: "reserve", path: "/reservation", appear: dontAppear },
  { name: "settings", path: "/settings", appear: doAppear },
  { name: "Sign up", path: "/login_signup", appear: dontAppear },
  { name: "logout", path: "/", appear: doAppear },
];

const Navbar = () => {
  const [navList, setNavList] = useState(INITIAL_NAV_LIST);
  const [user, setUser] = useRecoilState(userState);

  return (
    <NavbarContainer>
      <NavList>
        {navList.map((item, i) =>
          item.appear(user) ? (
            <NavItem key={i}>
              <Link
                to={item.path}
                onClick={
                  item.name === "logout"
                    ? () => {
                        setUser(null);
                      }
                    : () => {}
                }
              >
                {item.name}
              </Link>
            </NavItem>
          ) : null
        )}
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;
