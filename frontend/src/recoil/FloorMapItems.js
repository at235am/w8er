import { atom } from "recoil";

const shortid = require("shortid");

export const DEFAULT_NODE_DATA = {
  rotateAngle: 0,
  size: { height: 60, width: 60 },
  label: "",
};

// const INITIAL_NODES = [
// {
//   type: "halfCircle",
//   id: shortid.generate(),
//   data: { ...DEFAULT_NODE_DATA, label: "3", rotateAngle: 30 },
//   position: { x: 0, y: 0 },
// },
// {
//   type: "circle",
//   id: shortid.generate(),
//   data: { ...DEFAULT_NODE_DATA, label: "a" },
//   position: { x: 240, y: 0 },
// },
// {
//   type: "lshape",
//   id: shortid.generate(),
//   data: { label: "f", size: { width: 120, height: 120 }, rotateAngle: 0 },
//   position: { x: 60, y: 40 },
// },
// {
//   type: "square",
//   id: shortid.generate(),
//   data: { ...DEFAULT_NODE_DATA, label: "BS" },
//   position: { x: -40, y: 80 },
// },
// {
//   type: "circle",
//   id: shortid.generate(),
//   data: { ...DEFAULT_NODE_DATA, label: "G5" },
//   position: { x: 120, y: 220 },
// },
// {
//   type: "square",
//   id: shortid.generate(),
//   data: { ...DEFAULT_NODE_DATA, label: "ZH" },
//   position: { x: 120, y: 220 },
// },
// ];

const INITIAL_NODES = [
  {
    type: "square",
    id: "eBzGXVmh7",
    data: {
      rotateAngle: 0,
      size: { height: 60, width: 60 },
      label: "D",
      type: "square",
      position: { x: 445, y: 344 },
    },
    position: { x: 445, y: 344 },
  },
  {
    type: "rectangle",
    id: "5Nsss_tkZ",
    data: {
      rotateAngle: 90,
      size: { height: 100, width: 100 },
      label: "ALT",
      type: "rectangle",
      position: { x: 587, y: 446 },
    },
    position: { x: 587, y: 446 },
  },
  {
    type: "lshape",
    id: "XDUNGC3s9",
    data: {
      rotateAngle: -135,
      size: { height: 120, width: 120 },
      label: "B2",
      type: "lshape",
      position: { x: 415, y: 420 },
    },
    position: { x: 415, y: 430 },
  },
  {
    type: "circle",
    id: "LiJHQa0bS",
    data: {
      rotateAngle: 0,
      size: { height: 60, width: 60 },
      label: "F",
      type: "circle",
      position: { x: 677, y: 335 },
    },
    position: { x: 677, y: 335 },
  },
  {
    type: "circle",
    id: "sFhRNY5SG",
    data: {
      rotateAngle: 0,
      size: { height: 60, width: 60 },
      label: "E",
      type: "circle",
      position: { x: 565, y: 335 },
    },
    position: { x: 565, y: 335 },
  },
  {
    type: "circle",
    id: "frhAwy-4g",
    data: {
      rotateAngle: 0,
      size: { height: 60, width: 60 },
      label: "G",
      type: "circle",
      position: { x: 764, y: 331 },
    },
    position: { x: 764, y: 331 },
  },
  {
    type: "rectangle",
    id: "teTnGqa98",
    data: {
      rotateAngle: 90,
      size: { height: 100, width: 100 },
      label: "F4",
      type: "rectangle",
      position: { x: 730, y: 445 },
    },
    position: { x: 730, y: 445 },
  },
  {
    type: "square",
    id: "m5dmvm1yU",
    data: {
      rotateAngle: 0,
      size: { height: 60, width: 60 },
      label: "C",
      type: "square",
      position: { x: 750, y: 230 },
    },
    position: { x: 750, y: 230 },
  },
  {
    type: "rectangle",
    id: "2smplR6fi",
    data: {
      rotateAngle: -90,
      size: { height: 120, width: 120 },
      label: "B",
      type: "rectangle",
      position: { x: 600, y: 200 },
    },
    position: { x: 600, y: 200 },
  },

  {
    type: "rectangle",
    id: "s-qlVwg4J",
    data: {
      rotateAngle: -90,
      size: { height: 120, width: 120 },
      label: "A",
      type: "rectangle",
      position: { x: 445, y: 200 },
    },
    position: { x: 445, y: 200 },
  },
];

export const FloorMapItems = atom({
  key: "floorMapItems",
  // default: INITIAL_NODES,
  default: [],
});
