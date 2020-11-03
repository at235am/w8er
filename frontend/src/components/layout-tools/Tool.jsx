import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";
import { Shape, opacityStyle } from "./ToolStyles";
// import { Shape } from "./ToolStyles";

import { DEFAULT_NODE_DATA } from "../../recoil/FloorMapItems";

import { ReactComponent as CircleShape } from "../../assets/shapes/circle.svg";
import { ReactComponent as HalfCircleShape } from "../../assets/shapes/half-circle.svg";
import { ReactComponent as TriangleShape } from "../../assets/shapes/triangle.svg";
import { ReactComponent as SquareShape } from "../../assets/shapes/square.svg";
import { ReactComponent as RectangleShape } from "../../assets/shapes/rectangle.svg";
import { ReactComponent as LshapeShape } from "../../assets/shapes/lshape.svg";

const ToolShape = styled(Shape)`
  background-color: transparent;
  cursor: move;

  &:hover {
    svg {
      rect,
      circle,
      path {
        fill: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;

const Tool = ({ type = "square", data = DEFAULT_NODE_DATA, ...props }) => {
  const [{ isDragging, end, coords, ...dragProps }, drag] = useDrag({
    item: { type: ItemTypes.TOOL, data: { ...data, type } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      end: monitor.getDropResult(),
    }),
  });

  const renderShape = () => {
    switch (type) {
      case "square":
        return React.createElement(SquareShape);
      case "rectangle":
        return React.createElement(RectangleShape);

      case "lshape":
        return React.createElement(LshapeShape);

      case "triangle":
        return React.createElement(TriangleShape);

      case "halfCircle":
        return React.createElement(HalfCircleShape);
      case "circle":
        return React.createElement(CircleShape);
      default:
        return React.createElement(SquareShape);
    }
  };

  return (
    <ToolShape
      {...props}
      ref={drag}
      type={type}
      css={isDragging ? opacityStyle : null}
    >
      {renderShape()}
    </ToolShape>
  );
};

export default Tool;
