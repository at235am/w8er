import React, { useState, useEffect, memo } from "react";
import { useRecoilState } from "recoil";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom hooks:
import useRepeatLongPress from "../../hooks/useRepeatLongPress";

// styles:
import { ToolContainer, Shape, Label } from "./ToolStyles";

import { ReactComponent as CircleShape } from "../../assets/shapes/circle.svg";
import { ReactComponent as HalfCircleShape } from "../../assets/shapes/half-circle.svg";
import { ReactComponent as TriangleShape } from "../../assets/shapes/triangle.svg";
import { ReactComponent as SquareShape } from "../../assets/shapes/square.svg";
import { ReactComponent as RectangleShape } from "../../assets/shapes/rectangle.svg";
import { ReactComponent as LshapeShape } from "../../assets/shapes/lshape.svg";

// icons:
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

// Node states and defaults:
import { FloorMapItems, DEFAULT_NODE_DATA } from "../../recoil/FloorMapItems";

// const seatDefault = ({ theme, selected }) => css`
//   svg {
//     path,
//     circle,
//     rect {
//       fill: ${theme.colors.outline};
//     }
//   }
// `;

const SeatToolContainer = styled(ToolContainer)`
  &:hover {
    .seat-label {
      color: white;
    }
  }
`;

const SeatShape = styled(Shape)`
  svg {
    path,
    circle,
    rect {
      fill: ${({ theme, selected }) =>
        selected ? theme.colors.primary : theme.colors.outline};
    }
  }
`;

const SeatLabel = styled(Label)`
  cursor: pointer;
  color: ${({ theme, selected }) =>
    selected ? "white" : theme.colors.onBackground};
`;

const ToolNode = memo(
  ({
    id,
    type = "square",
    selected,
    data = DEFAULT_NODE_DATA,
    mode = "normal",
    info,
    rotateUnit = 15,
    sizeUnit = 20,
    shape = SquareShape,
    ...props
  }) => {
    const [items, setItems] = useRecoilState(FloorMapItems);

    useEffect(() => {
      // console.log("ToolNodeChanged", id, type, rotateAngle, data.rotateAngle);
    }, [data.rotateAngle, data.size, data.label]);

    return (
      <SeatToolContainer {...props}>
        <SeatShape
          className="shape"
          size={data.size}
          rotateAngle={data.rotateAngle}
          type={type}
          selected={selected}
          // info={info}
          // css={seatDefault}
        >
          {React.createElement(shape)}
        </SeatShape>
        <SeatLabel
          selected={selected}
          className="seat-label"
          onClick={() => console.log("help")}
          shapeType={type}
        >
          {data.label}
        </SeatLabel>
      </SeatToolContainer>
    );
  }
);

const Square = ({ selected, ...props }) => {
  return (
    <ToolNode
      {...props}
      selected={selected}
      shape={SquareShape}
      type="square"
    ></ToolNode>
  );
};

const Circle = ({ selected, ...props }) => {
  return (
    <ToolNode
      {...props}
      selected={selected}
      shape={CircleShape}
      type="circle"
    ></ToolNode>
  );
};

const HalfCircle = ({ selected, ...props }) => {
  return (
    <ToolNode
      {...props}
      selected={selected}
      shape={HalfCircleShape}
      type="halfCircle"
    ></ToolNode>
  );
};

const Lshape = ({ selected, ...props }) => {
  return (
    <ToolNode
      {...props}
      selected={selected}
      shape={LshapeShape}
      type="lshape"
    ></ToolNode>
  );
};

const Rectangle = ({ selected, ...props }) => {
  return (
    <ToolNode
      {...props}
      selected={selected}
      shape={RectangleShape}
      type="rectangle"
    ></ToolNode>
  );
};

const Triangle = ({ selected, ...props }) => {
  return (
    <ToolNode
      {...props}
      selected={selected}
      shape={TriangleShape}
      type="triangle"
    ></ToolNode>
  );
};

export default ToolNode;
export { Square, Circle, HalfCircle, Lshape, Rectangle, Triangle };
