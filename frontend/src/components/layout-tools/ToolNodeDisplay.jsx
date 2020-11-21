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

const GuestDetails = styled.div`
  position: absolute;
  top: -2rem;
  left: 0;
  z-index: 3;

  border-radius: 3px;

  /* height: 3rem; */
  /* width: 100%; */

  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.outline};

  display: flex;
  align-items: center;

  padding: 0.5rem;
`;

const GuestName = styled.p`
  white-space: nowrap;
  text-transform: capitalize;
  /* background-color: ${({ theme }) => "red"}; */
  padding-right: 0.5rem;

  color: ${({ theme }) => theme.colors.onBackground};
`;

const PartySize = styled.div`
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 5rem;

  background-color: ${({ theme }) => theme.colors.onBackground};
  color: ${({ theme }) => theme.colors.background};
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToolNode = memo(
  ({
    id,
    type = "square",
    // selected,
    data = DEFAULT_NODE_DATA,
    mode = "normal",
    info,
    rotateUnit = 15,
    sizeUnit = 20,
    shape = SquareShape,
    ...props
  }) => {
    const [items, setItems] = useRecoilState(FloorMapItems);
    const [guestData, setGuestData] = useState(null);
    const [{ item, isOver, didDrop, ...addedProps }, drop] = useDrop({
      accept: ItemTypes.GUEST,
      collect: (monitor, componen) => ({
        isOver: monitor.isOver(),
        didDrop: monitor.didDrop(),
        item: monitor.getItem(),
      }),
      drop: (props, monitor, component) => {
        setGuestData(props);
        // const fin = monitor.getClientOffset();
        // const offset = fmRef.current.getBoundingClientRect();
        // setEndDropCoords({ x: fin.x - offset.x, y: fin.y - offset.y });
      },
    });

    useEffect(() => {
      // console.log("ToolNodeChanged", id, type, rotateAngle, data.rotateAngle);
    }, [data.rotateAngle, data.size, data.label]);

    // const updateNodeData = () => {
    //   const deleteIndex = items.findIndex((item, i) => item.id === id);

    //   if (deleteIndex > -1) {
    //     const itemCopy = items[deleteIndex];

    //     const updatedItem = {
    //       ...itemCopy,
    //       data: { ...itemCopy.data, rotateAngle, size, label },
    //     };

    //     const updatedItems = [
    //       ...items.slice(0, deleteIndex),
    //       ...items.slice(deleteIndex + 1, items.length),
    //       updatedItem,
    //     ];

    //     setItems(updatedItems);
    //   }
    // };

    // useEffect(() => {
    //   updateNodeData();
    // }, [selected]);

    // useEffect(() => {
    //   updateNodeData();
    // }, [rotateAngle, size, label]);

    return (
      <ToolContainer {...props} ref={drop}>
        {/* <Shape size={size} rotateAngle={rotateAngle} type={type} info={info} /> */}
        {guestData && (
          <GuestDetails>
            <GuestName>{guestData.data.name}</GuestName>
            <PartySize>{guestData.data.party}</PartySize>
          </GuestDetails>
        )}
        <Shape
          className="shape"
          size={data.size}
          rotateAngle={data.rotateAngle}
          type={type}
          // info={info}
        >
          {React.createElement(shape)}
        </Shape>
        <Label shapeType={type}>{data.label}</Label>
      </ToolContainer>
    );
  }
);

const Square = ({ selected, ...props }) => {
  return (
    <ToolNode
      {...props}
      // selected={selected}
      shape={SquareShape}
      type="square"
    ></ToolNode>
  );
};

const Circle = ({ ...props }) => {
  return (
    <ToolNode
      {...props}
      // selected={selected}
      shape={CircleShape}
      type="circle"
    ></ToolNode>
  );
};

const HalfCircle = ({ ...props }) => {
  return (
    <ToolNode
      {...props}
      // selected={selected}
      shape={HalfCircleShape}
      type="halfCircle"
    ></ToolNode>
  );
};

const Lshape = ({ ...props }) => {
  return (
    <ToolNode
      {...props}
      // selected={selected}
      shape={LshapeShape}
      type="lshape"
    ></ToolNode>
  );
};

const Rectangle = ({ ...props }) => {
  return (
    <ToolNode
      {...props}
      // selected={selected}
      shape={RectangleShape}
      type="rectangle"
    ></ToolNode>
  );
};

const Triangle = ({ ...props }) => {
  return (
    <ToolNode
      {...props}
      // selected={selected}
      shape={TriangleShape}
      type="triangle"
    ></ToolNode>
  );
};

export default ToolNode;
export { Square, Circle, HalfCircle, Lshape, Rectangle, Triangle };
