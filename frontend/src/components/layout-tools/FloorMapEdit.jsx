import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { Background, MiniMap } from "react-flow-renderer";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";
import { HiUser } from "react-icons/hi";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";

import { FloorMapItems } from "../../recoil/FloorMapItems";

import {
  Square,
  Circle,
  HalfCircle,
  Lshape,
  Rectangle,
  Triangle,
} from "../layout-tools/ToolNodeEdit";
import { useRecoilState } from "recoil";

const shortid = require("shortid");

const FloorMapContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  /* background-color: red; */

  /* VERY IMPORTANT LINE: */
  /* ensures that the right margin is accounted for it overflows */
  display: inline-block;
`;

const DropTarget = styled.div`
  width: 100%;
  height: 100%;
`;

const nodeTypes = {
  square: Square,
  circle: Circle,
  halfCircle: HalfCircle,
  lshape: Lshape,
  test: HiUser,
  rectangle: Rectangle,
  triangle: Triangle,
};

const FloorMapEdit = () => {
  const [reactFlow, setReactFlow] = useState({});
  const theme = useTheme();
  const fmRef = useRef();
  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [items, setItems] = useRecoilState(FloorMapItems);
  const [endDropCoords, setEndDropCoords] = useState({ x: 0, y: 0 });

  const [{ item, isOver, didDrop, ...addedProps }, drop] = useDrop({
    accept: ItemTypes.TOOL,
    collect: (monitor, componen) => ({
      isOver: monitor.isOver(),
      didDrop: monitor.didDrop(),
      item: monitor.getItem(),
    }),
    drop: (props, monitor, component) => {
      const fin = monitor.getClientOffset();
      const offset = fmRef.current.getBoundingClientRect();
      setEndDropCoords({ x: fin.x - offset.x, y: fin.y - offset.y });
    },
  });

  // const updateNode = (id, updatedItem) => {
  //   console.log("updateNode", id, updatedItem);

  //   const deleteIndex = items.findIndex((item, i) => {
  //     console.log(item.id, id, item.id === id);

  //     return item.id === id;
  //   });
  //   console.log("deleteIndex", deleteIndex);

  //   if (deleteIndex > -1) {
  //     console.log("updating");
  //     const updatedItems = [
  //       ...items.slice(0, deleteIndex),
  //       ...items.slice(deleteIndex + 1, items.length),
  //       updatedItem,
  //     ];

  //     setItems(updatedItems);
  //   }
  // };

  useEffect(() => {
    console.log("didDrop", didDrop, item);

    if (item) {
      console.log("didDrop", didDrop, item.data);
      const projectPosition = reactFlow.project(endDropCoords);
      const newItem = {
        type: item.data.type,
        id: shortid.generate(),
        data: { ...item.data, position: projectPosition },
        position: projectPosition,
      };
      console.log("newItem", newItem);
      setItems([...items, newItem]);
    }
  }, [didDrop]);

  useEffect(() => {
    console.log("isOver", isOver, item);
  }, [isOver]);

  // useEffect(() => {
  //   if (fmRef) {
  //     const { x, y } = fmRef.ref.current.getBoundingClientRect();
  //     setOffset({ x, y });
  //   }
  // }, [fmRef]);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
    reactFlowInstance.zoomTo(1);
    setReactFlow(reactFlowInstance);
  };

  return (
    <FloorMapContainer
      ref={fmRef}
      onClick={(e) => console.log("got some", JSON.stringify(items))}
    >
      <DropTarget ref={drop}>
        {/* <button onClick={() => console.log(items)}>FLOOR MAP EDIT</button> */}
        <ReactFlow
          // onClick={() => consle.log(items)}
          onLoad={onLoad}
          elements={items}
          // snapToGrid
          nodeTypes={nodeTypes}
          snapGrid={[theme.dimensions.gridUnit, theme.dimensions.gridUnit]}
          // translateExtent={[
          //   [0, 0],
          //   [500, 500],
          // ]}
          nodesDraggable={true}
        >
          <Background
            variant="dots"
            gap={theme.dimensions.gridUnit}
            color={rgba(theme.colors.onBackground, 0.3)}
            size={1}
          />

          {/* <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case "input":
                  return "red";
                case "default":
                  return "#00ff00";
                case "output":
                  return "rgb(0,0,255)";
                default:
                  return "#eee";
              }
            }}
          /> */}
        </ReactFlow>
      </DropTarget>
    </FloorMapContainer>
  );
};

export default FloorMapEdit;
