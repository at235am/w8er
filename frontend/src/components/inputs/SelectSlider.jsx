import React, { useState, useEffect, useRef } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

const SelectSliderContainer = styled.div`
  /* margin-top: 2rem; */

  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  padding: 5px;

  background-color: ${({ theme }) => theme.colors.background};
  position: relative;

  overflow-x: hidden;
`;

const SelectSliderContainer2 = styled.div`
  width: 100%;
  overflow-x: hidden;

  display: flex;
  align-items: center;
`;

const OptionsDraggable = styled.div`
  display: flex;
  transition: transform 200ms ease-out;

  transform: translateX(${({ currentPosition }) => `${currentPosition}px`});
`;

const itemSelectedStyle = ({ theme, glow }) => css`
  background-color: ${glow ? theme.colors.primary : theme.colors.surface};
  color: ${glow ? theme.colors.onPrimary : theme.colors.onBackground};
`;

const OptionItem = styled.div`
  ${itemSelectedStyle}

  cursor: pointer;

  padding: 0.25rem 0.7rem;
  border-radius: 3px;

  margin-right: 4px;
  user-select: none;

  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    ${(props) => itemSelectedStyle({ ...props, glow: true })}
  }
`;

const SelectSliderLabel = styled.label`
  z-index: 4;
  color: ${({ theme }) => theme.colors.onBackground};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  margin-left: 0.4rem;

  white-space: nowrap;

  span {
    font-weight: bold;

    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Shadow = styled.div`
  z-index: 3;
  background-color: #fff;
  height: 100%;
  width: 0;
  position: absolute;

  box-shadow: 0px 0px 20px 20px ${({ theme }) => theme.colors.background};

  ${({ orientation }) =>
    orientation === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;

const SelectSlider = ({ label, options, handleChange, value, ...props }) => {
  const draggableRef = useRef(null);
  const containerRef = useRef(null);

  const [mouseDowned, setMouseDowned] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragEnd, setDragEnd] = useState({ x: 0, y: 0 });

  const [itemSelected, setItemSelected] = useState("");

  useEffect(() => {
    // console.log("SELECT SLIDER");

    const optionsWidth =
      draggableRef.current.offsetWidth - containerRef.current.offsetWidth;
    const dragDifference = dragEnd.x - dragStart.x;
    let newPosition = currentPosition + dragDifference;

    if (newPosition > 0) newPosition = 0;
    else if (newPosition < -1 * optionsWidth) newPosition = -1 * optionsWidth;
    // console.log(
    //   `drag.diff=${dragDifference} | oldPos=${currentPosition} | newPos=${newPosition} | width=${optionsWidth}`
    // );

    setCurrentPosition(newPosition);

    // setCurrentPosition((currentPosition + (dragStart.x - dragEnd.x)) * 0.1);
  }, [dragEnd]);

  useEffect(() => {
    setItemSelected(value);
  }, [value]);

  const finishDrag = (e) => {
    setDragEnd({ x: e.clientX, y: e.clientY });
    setMouseDowned(false);
  };

  return (
    <SelectSliderContainer {...props}>
      <Shadow orientation="left"></Shadow>
      <SelectSliderLabel
        onClick={() => console.log("selectedItem", itemSelected)}
      >
        {label}: <span>{value.id ? value.label : JSON.stringify(value)}</span>
      </SelectSliderLabel>
      <SelectSliderContainer2
        ref={containerRef}
        onMouseDown={(e) => {
          setDragStart({ x: e.clientX, y: e.clientY });
          setMouseDowned(true);
        }}
        onMouseUp={(e) => {
          finishDrag(e);
        }}
        onMouseLeave={(e) => {
          if (mouseDowned) {
            finishDrag(e);
          }
        }}
        // onTouchStart and onTouchMove is required to register touch events on a mobile browser:
        onTouchStart={(e) => {
          setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }}
        onTouchMove={(e) => {
          setDragEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }}
      >
        <OptionsDraggable ref={draggableRef} currentPosition={currentPosition}>
          {options.map((item, i) => (
            <OptionItem
              key={i}
              glow={
                item.id ? item.id === itemSelected.id : item === itemSelected
              }
              onClick={() => {
                console.log("good1", item);
                setItemSelected(item);
                handleChange(item);
                // console.log("good2");
              }}
            >
              {item.id ? item.label : JSON.stringify(item)}
            </OptionItem>
          ))}
        </OptionsDraggable>
      </SelectSliderContainer2>
      <Shadow orientation="right" />
    </SelectSliderContainer>
  );
};

export default SelectSlider;
