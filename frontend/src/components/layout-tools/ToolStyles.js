// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const halfCircle = css`
  transform-origin: 50% 25%;
  clip-path: circle(50% at 50% 0);
  /* padding-top: 50%; */
  /* clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); */
`;

const circle = css`
  border-radius: 50%;
`;

const lshape = css`
  transform-origin: 25% 75%;

  clip-path: polygon(0 0, 50% 0, 50% 50%, 100% 50%, 100% 100%, 0 100%);
`;

const rectangle = (theme, size) => css`
  width: ${size ? size.width / 2 : (theme.dimensions.gridUnit / 2) * 3}px;
`;

const ToolContainer = styled.div`
  /* background-color: lightblue; */
  position: relative;

  &:hover {
    .shape {
      svg {
        path,
        circle,
        rect {
          fill: ${({ theme }) => theme.colors.secondary};
        }
      }
    }
  }
`;

const Shape = styled.div`
  position: relative;

  width: ${({ theme, size }) =>
    size ? size.width : theme.dimensions.gridUnit * 3}px;
  height: ${({ theme, size }) =>
    size ? size.height : theme.dimensions.gridUnit * 3}px;

  /* background-color: ${({ theme }) => theme.colors.primary}; */
  background-color: transparent;
  /* background-color: red; */

  /* border: 1px solid ${({ theme }) => theme.colors.onBackground}; */
  /* border: 1px solid red; */

  transform: rotate(${({ rotateAngle }) => rotateAngle}deg);

  transition-property: transform, width, height;
  transition-duration: 200ms;
  transition-timing-function: linear;

  /* cursor: move;

  display: flex;
  justify-content: center;
  align-items: center;

  /* &:active {
    background-color: red;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  } */

  svg {
    width: 100%;
    height: 100%;
    path,
    circle,
    rect {
      fill: ${({ theme }) => theme.colors.primary};
    }

    /* width: ${({ theme, size }) =>
      size ? size.width : theme.dimensions.gridUnit * 3}px;
    height: ${({ theme, size }) =>
      size ? size.height : theme.dimensions.gridUnit * 3}px;

    transform: rotate(${({ rotateAngle }) => rotateAngle}deg);

    transition-property: transform, width, height;
    transition-duration: 200ms;
    transition-timing-function: linear; */
  }
`;
/* ${({ type, theme, size }) => {
    switch (type) {
      case "square":
        return null;
      case "circle":
        return circle;
      case "halfCircle":
        return halfCircle;
      case "lshape":
        return lshape;
      case "rectangle":
        return rectangle(theme, size);
      default:
        return null;
    }
  }} */
const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: red; */
  width: 100%;
  height: 100%;

  color: white;
  font-weight: bold;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelInput = styled.input`
  margin: auto;
  background-color: transparent;
  /* background-color: red; */
  /* width: 100%; */
  cursor: move;

  font-weight: bold;

  min-width: 3rem;
  width: 100%;
  max-width: 10rem;

  text-transform: uppercase;

  text-align: center;

  position: absolute;
  /* top: 30%;
  left: 20%; */
  top: 0;
  bottom: 0;

  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;

  /* color: ${({ theme }) => theme.colors.surface}; */
  color: white;
`;

//  ${({ shapeType, theme }) => {
//     switch (shapeType) {
//       case "halfCircle":
//         return css`
//           bottom: auto;
//           top: 15%;
//         `;
//       case "lshape":
//         return css`
//           /* color: ${theme.colors.onBackground}; */
//           top: 75%;
//           bottom: auto;
//           left: 0;
//           right: auto;
//         `;
//       default:
//         return null;
//     }
//   }}

const overlayControls = (theme) => css`
  /* position: absolute; */
  background-color: transparent;

  /* top: -3rem; */
  cursor: pointer;
  margin-left: 0.5rem;

  svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: ${theme.colors.onBackground};
    }
  }

  &:hover {
    svg {
      path {
        fill: ${theme.colors.primary};
      }
    }
  }
`;

const RotateCCWControl = styled.button`
  ${({ theme }) => overlayControls(theme)}
  left: 0;
  margin-left: 0;
`;

const RotateCWControl = styled.button`
  ${({ theme }) => overlayControls(theme)}
  left: 3rem;
`;

const DecreaseSize = styled.button`
  ${({ theme }) => overlayControls(theme)}
  left:6rem;
`;

const IncreaseSize = styled.button`
  ${({ theme }) => overlayControls(theme)}
  left: 9rem;
`;

/* 
  this hidden hack was made because using the prop "selected" to conditionally render
  the four controls (+, -, cw, ccw) made it so that the controls did not fire onTouchStart
  or any event on MOBILE; it still worked as normal on desktop or minimized desktop.
*/
const HiddenHack = styled.div`
  position: absolute;
  top: -4rem;
  left: 0;
  background-color: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.outline};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 5rem;
  ${({ selected }) =>
    !selected
      ? css`
          display: none;
        `
      : css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
`;

const opacityStyle = css`
  /* opacity: 0.5; */
  background-color: transparent;
`;

export {
  ToolContainer,
  opacityStyle,
  Shape,
  RotateCWControl,
  RotateCCWControl,
  IncreaseSize,
  DecreaseSize,
  HiddenHack,
  LabelInput,
  Label,
};
