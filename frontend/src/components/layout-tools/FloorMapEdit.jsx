import React, { useState, useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  useStoreState,
} from "react-flow-renderer";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";
import { HiUser } from "react-icons/hi";
import { db } from "../../firebase";
import { Portal } from "react-portal";

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
import { useAuth } from "../../contexts/AuthContext";
import Button from "../buttons/Button";
import Spinner from "../Spinner";
import { ChangeDetectedState } from "../../recoil/ChangeDetectedState";
import { SaveButtonState } from "../../recoil/SaveButtonState";

const shortid = require("shortid");

const FloorMapContainer = styled.div`
  position: relative;
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

const SaveButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.correct};
  /* position: absolute; */
  /* z-index: 200; */
  /* bottom: 0; */
  /* right: 0; */
  margin: 0 1rem;
`;

const BottomOverlay = styled.div`
  position: fixed;
  z-index: 500;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.primary};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotificationText = styled.p`
  color: white;
  font-weight: bold;
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
  const { currentUser } = useAuth();

  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [changeDetected, setChangeDetected] = useRecoilState(
    ChangeDetectedState
  );
  const [saveLoading, setSaveLoading] = useRecoilState(SaveButtonState);
  const [items, setItems] = useRecoilState(FloorMapItems);
  const nodes = useStoreState((store) => store.nodes);
  const [endDropCoords, setEndDropCoords] = useState({ x: 0, y: 0 });
  const nodesRef = useRef(nodes);

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

  const layoutRef = db
    .collection("restaurants")
    .doc(currentUser.uid)
    .collection("layout");

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
  const getChangedItems = (myNodes) => {
    console.log("G nodes", nodes);
    console.log("G nodesRef", nodesRef.current);
    console.log("G myNodes", myNodes);
    const isSamePosition = (node) => {
      const x1 = node.position.x;
      const y1 = node.position.y;
      const x2 = node.__rf.position.x;
      const y2 = node.__rf.position.y;

      return x1 === x2 && y1 === y2;
    };

    const changedItems = myNodes.filter((node) =>
      node.data.changed || !isSamePosition(node) ? true : false
    );

    return changedItems;
  };

  const saveNodeChanges = async (myNodes) => {
    // setChangeDetected(false);
    setSaveLoading(true);
    // e.preventDefault();

    try {
      // setLoading(true);
      // const
      // await layoutRef.doc(newGuest.id).set(newGuest);
      // setLoading(false);

      // const isSamePosition = (node) => {
      //   const x1 = node.position.x;
      //   const y1 = node.position.y;
      //   const x2 = node.__rf.position.x;
      //   const y2 = node.__rf.position.y;

      //   return x1 === x2 && y1 === y2;
      // };

      // const changedItems = nodes.filter((node) =>
      //   node.data.changed || !isSamePosition(node) ? true : false
      // );

      // console.log("changed Items", changedItems);
      // reactFlow.getElements().forEach((e) => console.log(e));
      // nodes.forEach((node) => {
      //   console.log("node", node);
      // });

      // console.log("help", nodes);
      // console.log("mine", items);

      const changedItems = getChangedItems(myNodes);
      if (changedItems.length !== 0) {
        const batch = db.batch();

        changedItems.forEach((item) => {
          let newItem = { ...item };
          delete newItem.data.changed;
          delete newItem.data.delete;
          newItem = { ...newItem, position: newItem.__rf.position };
          delete newItem.__rf;
          // console.log("each", newItem);
          if (item.data.delete) {
            batch.delete(layoutRef.doc(item.id), newItem);
          } else {
            batch.update(layoutRef.doc(item.id), newItem);
          }
        });

        await batch.commit();
      }
    } catch (e) {
      // setLoading(false);
      console.error("error creating res", e);
    }
    setSaveLoading(false);
    setChangeDetected(false);
    // setGuest(INITIAL_GUEST);
  };

  useEffect(() => {
    // setLoading(true);

    const unSubscribeFME = layoutRef.onSnapshot((qs) => {
      console.log("rt update");
      const items = [];
      qs.forEach((doc) => {
        items.push(doc.data());
      });

      setItems(items);
    });

    return () => {
      unSubscribeFME();
      console.log("dismount floor map edit", items);
      // console.log("nodesssssssssssssssssss", nodes);
      console.log("nodeRef", nodesRef.current);
      saveNodeChanges(nodesRef.current);
    };
  }, []);

  useEffect(() => {
    console.log("item changed maybe");
    const changedItems = getChangedItems(nodes);

    if (changedItems.length !== 0) {
      // console.log(getChangedItems);
      console.log("true change", changedItems);
      setChangeDetected(true);
      nodesRef.current = nodes;
    }
  }, [nodes, items]);

  useEffect(() => {
    console.log("didDrop", didDrop, item);

    if (item) {
      // console.log("didDrop", didDrop, item.data);
      const projectPosition = reactFlow.project(endDropCoords);
      const { type, rotateAngle, size, label } = item.data;
      const newItem = {
        id: shortid.generate(),
        type: type,
        // type: item.data.type,
        position: projectPosition,
        data: { rotateAngle, size, label },
        // data: { ...item.data, position: projectPosition },
      };
      // console.log("newItem", newItem);
      // setItems([...items, newItem]);

      layoutRef
        .doc(newItem.id)
        .set(newItem)
        .then((res) => console.log("didDrop ressss", res))
        .catch((e) => console.log("didDrop Errorrrr", e));
    }
  }, [didDrop]);

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
      // onClick={(e) => console.log("current items", items)}
      // onClick={(e) => console.log("got some", JSON.stringify(items))}
    >
      {/* {true && (
        <SaveButton
          type="button"
          text="Changed detected. Save."
          onClick={saveNodeChanges}
          spinner={saveLoading}
        />
      )} */}
      <Portal node={document && document.getElementById("notification")}>
        <BottomOverlay change={changeDetected}>
          {changeDetected ? (
            <React.Fragment>
              <NotificationText>You have unsaved changes</NotificationText>
              <SaveButton
                type="button"
                text="Save"
                onClick={() => saveNodeChanges(nodesRef.current)}
              />
              {saveLoading && (
                <Spinner
                  css={css`
                    position: absolute;
                    right: 0;
                    z-index: 500;
                  `}
                />
              )}
            </React.Fragment>
          ) : (
            <NotificationText>Changes up to date</NotificationText>
          )}
        </BottomOverlay>
      </Portal>

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
