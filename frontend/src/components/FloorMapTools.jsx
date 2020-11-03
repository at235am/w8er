import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";
import DetailBit from "./DetailBit";
import AddGuest from "./AddGuest";
import DrawerHeader from "./DrawerHeader";
import Tool from "./layout-tools/Tool";

// icon:
import { IoMdAddCircle } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { FaCaretSquareDown } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { useRef } from "react";

import { ReactComponent as Circle } from "../assets/shapes/circle.svg";
import { ReactComponent as Triangle } from "../assets/shapes/triangle.svg";
import { ReactComponent as HalfCircle } from "../assets/shapes/half-circle.svg";
import { ReactComponent as Square } from "../assets/shapes/square.svg";
import { ReactComponent as Rectangle } from "../assets/shapes/rectangle.svg";
import { ReactComponent as Lshape } from "../assets/shapes/lshape.svg";

const FMTContainer = styled.div`
  position: relative;
  /* margin: 1rem; */
  width: 100%;
  height: 100%;
  /* padding: 1rem; */

  /* background-color: ${({ theme }) => theme.colors.background}; */
  /* border-radius: 4px; */
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  .add-btn-container {
    width: 100%;
    display: flex;
  }
`;

const FMTContent = styled.ul`
  width: 100%;
  padding: 0.5rem;

  /* flex: 1; */
  margin-top: 1.5rem;

  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const GLExtras = styled.div`
  width: 100%;
  /* margin: 0 1rem; */

  background-color: ${({ theme }) => theme.colors.surface};

  color: ${({ theme }) => theme.colors.onBackground};

  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* margin-top: ${({ glExtrasOpen }) => (glExtrasOpen ? "1rem" : "0")}; */
`;

const margin = css`
  margin: 1rem;
`;

const DirectionsText = styled.p`
  margin-top: 0.5rem;
  font-style: italic;
`;

const FloorMapTools = () => {
  return (
    <FMTContainer>
      <DrawerHeader headerTitle="Floor Map Tools" />
      <DirectionsText>TIP: drag a table to the floor map</DirectionsText>

      <FMTContent className="floor-map-tools-content">
        <Tool
          type="square"
          info={{ id: "", data: { type: "square" }, position: { x: 0, y: 0 } }}
          css={margin}
        />
        <Tool
          type="circle"
          info={{ id: "", data: { type: "circle" }, position: { x: 0, y: 0 } }}
          css={margin}
        />
        <Tool
          type="halfCircle"
          info={{
            id: "",
            data: { type: "halfCircle" },
            position: { x: 0, y: 0 },
          }}
          css={margin}
        />

        <Tool
          type="lshape"
          info={{ id: "", data: { type: "lshape" }, position: { x: 0, y: 0 } }}
          css={margin}
        />

        <Tool
          type="rectangle"
          info={{
            id: "",
            data: { type: "rectangle" },
            position: { x: 0, y: 0 },
          }}
          css={margin}
        />

        <Tool
          type="triangle"
          info={{
            id: "",
            data: { type: "triangle" },
            position: { x: 0, y: 0 },
          }}
          css={margin}
        />
      </FMTContent>
    </FMTContainer>
  );
};

export default FloorMapTools;
