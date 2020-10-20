import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import FloorMap from "../components/layout-tools/FloorMap";

import Navigation from "../components/Navigation";
import Guest from "./guest";

import { useHistory } from "react-router-dom";

const GuestFMContainer = styled.div`
  width: 100%;
  /* flex: 1; */
  height: 100%;

  /* padding: 2rem; */

  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`;

const GuestListContainer = styled.div`
  height: 100%;
  width: 25rem;
  overflow: auto;
  /* background-color: red; */
`;

const FloorMapContainer = styled.div`
  /* height: 100%; */
  flex: 1;
  background-color: blue;
`;

const GuestList_Floormap = () => {
  const history = useHistory();

  return (
    <GuestFMContainer className="sdlfkjsdlkfjlkjsdlf">
      {/* <Navigation></Navigation> */}
      <MainContent>
        <GuestListContainer>
          <Guest></Guest>
        </GuestListContainer>
        <FloorMapContainer>
          <FloorMap />
        </FloorMapContainer>
      </MainContent>
    </GuestFMContainer>
  );
};

export default GuestList_Floormap;
