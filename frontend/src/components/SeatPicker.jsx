import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { Background, MiniMap } from "react-flow-renderer";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";
import { HiUser } from "react-icons/hi";
import { useStoreState, useStoreActions } from "react-flow-renderer";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import {
  Square,
  Circle,
  HalfCircle,
  Lshape,
  Rectangle,
  Triangle,
} from "../components/layout-tools/ToolNodeSeatPicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { FloorMapItems } from "../recoil/FloorMapItems";

// const shortid = require("shortid");

export const DEFAULT_NODE_DATA = {
  rotateAngle: 0,
  size: { height: 60, width: 60 },
  label: "",
};

const FloorMapContainer = styled.div`
  /* position: absolute; */
  /* z-index: 0; */
  /* top: 0; */
  /* left: 0; */

  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  /* background-color: red; */

  /* VERY IMPORTANT LINE: */
  /* ensures that the right margin is accounted for it overflows */
  /* display: inline-block; */
`;

const Header = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5rem;

  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;
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

const SeatPicker = ({ options, handleChange, value, ...props }) => {
  const [reactFlow, setReactFlow] = useState({});
  const nodes = useStoreState((store) => store.nodes);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const theme = useTheme();
  // const fmRef = useResizeObserver();
  // const [items, setItems] = useState(elements);
  const [items, setItems] = useRecoilState(FloorMapItems);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
    reactFlowInstance.zoomTo(1);
    setReactFlow(reactFlowInstance);
  };

  useEffect(() => {
    // const indexFound = items.findIndex((item) => item.data.label === value);
    // if (indexFound !== -1) {
    //   setSelectedElements({
    //     ...items[indexFound],
    //   });
    // }
    const indexFound = options.findIndex((item) => item.id === value.id);
    if (indexFound !== -1) {
      setSelectedElements({
        ...options[indexFound],
      });
    }
  }, [value, options]);
  // }, [value, items]);

  return (
    <FloorMapContainer>
      <Header>Choose a seat</Header>
      <ReactFlow
        zoomOnScroll={false}
        onLoad={onLoad}
        // elements={items}
        elements={options}
        onElementClick={(e, node) => {
          console.log("node", node);
          handleChange({ ...node, label: node.data.label });
        }}
        nodesDraggable={false}
        // snapToGrid
        nodeTypes={nodeTypes}
        snapGrid={[theme.dimensions.gridUnit, theme.dimensions.gridUnit]}
        // translateExtent={[
        //   [0, 0],
        //   [500, 500],
        // ]}
      >
        <Background
          variant="dots"
          gap={theme.dimensions.gridUnit}
          color={rgba(theme.colors.onBackground, 0.3)}
          size={1}
        />
      </ReactFlow>
    </FloorMapContainer>
  );
};

export default SeatPicker;
