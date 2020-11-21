import React from "react";
import { MdBrightnessLow } from "react-icons/md";
import { rgba } from "emotion-rgba";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useState } from "react";

const DEFAULT_SIZE = 28; // measured in pixels
const LONG_SCALING_FACTOR = 1.8; // meant to measure to scale the long side based of the short side

const dimensions = ({ size }) => css`
  height: ${size}px;
  width: ${LONG_SCALING_FACTOR * size}px;
  max-height: ${size}px;
  max-width: ${LONG_SCALING_FACTOR * size}px;
  min-height: ${size}px;
  min-width: ${LONG_SCALING_FACTOR * size}px;
`;

const ToggleContainer = styled.button`
  background-color: ${(props) => props.theme.colors.onBackground};

  transform: rotate(
    ${({ orientation }) => (orientation !== "vertical" ? 0 : 90)}deg
  );

  padding: 0.15rem;
  border-radius: 5rem;

  ${dimensions}

  &:hover {
    div {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const ToggleButton = styled.div`
  max-height: 100%;
  max-width: 50%;
  height: 100%;
  width: 50%;
  min-height: 100%;
  min-width: 50%;

  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.background};

  transform: translateX(${({ toggled }) => (toggled ? "100%" : "1%")});

  transition-property: transform, background-color;
  transition-duration: 250ms;
  transition-timing-function: linear;
`;

const ToggleInput = ({
  size = DEFAULT_SIZE,
  orientation,
  value,
  onClick = () => {},
  label,
  ...props
}) => {
  // const [toggled, setToggled] = useState(false);

  return (
    <ToggleContainer
      {...props}
      orientation={orientation}
      size={size}
      onClick={() => {
        // setToggled(value);
        onClick();
      }}
      aria-pressed={value}
    >
      <ToggleButton type="button" toggled={value} />
    </ToggleContainer>
  );
};

export default ToggleInput;
