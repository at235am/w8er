import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// state management:
import { useRecoilValue } from "recoil";
import { sidebarState } from "../recoil/SidebarState";

// custom components:
import Button from "./buttons/Button";
import DetailBit from "./DetailBit";
import AddGuest from "./AddGuest";
import DrawerHeader from "./DrawerHeader";
import GuestItem from "./GuestItem";

// icon:
import { IoMdAddCircle } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { FaCaretSquareDown } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";

import { MdExpandLess } from "react-icons/md";

const shortid = require("shortid");

const ONE_MINUTE_MS = 60000;
const RESERVE_OFFSET = 45 * ONE_MINUTE_MS;
const CURRENT_DATE = new Date();

const GUESTLIST = [
  {
    waitTime: new Date(CURRENT_DATE.getTime() - 30 * ONE_MINUTE_MS),
    id: shortid.generate(),
    name: "Mike",
    party: "2",
    phone: "555-555-4352",
    table: "",
    notes: "need 30 baby seats, dont ask",
    tableAssigned: "",
    reserveTime: "",
    seatedTime: "",
    departureTime: "",
  },
  // {
  //   waitTime: new Date(CURRENT_DATE.getTime() - 15 * ONE_MINUTE_MS),
  //   id: shortid.generate(),
  //   name: "ricky  bobby",
  //   party: "2",
  //   phone: "555-555-4352",
  //   table: "",
  //   notes: "bring food",
  //   tableAssigned: "",
  //   reserveTime: "",
  //   seatedTime: "",
  //   departureTime: "",
  // },
  // {
  //   waitTime: new Date(CURRENT_DATE.getTime() - 7 * ONE_MINUTE_MS),
  //   id: shortid.generate(),
  //   name: "Bob",
  //   party: "13",
  //   phone: "310-135-4352",
  //   table: "",
  //   notes: "i'm thinking about dropping danny green for missing that last 3",
  //   tableAssigned: "",
  //   reserveTime: "",
  //   seatedTime: "",
  //   departureTime: "",
  // },
  // {
  //   waitTime: new Date(CURRENT_DATE.getTime() - 71 * ONE_MINUTE_MS),
  //   id: shortid.generate(),
  //   name: "michael jackson",
  //   party: "4",
  //   phone: "123-565-5685",
  //   table: "",
  //   notes: "",
  //   tableAssigned: "",
  //   reserveTime: "",
  //   seatedTime: "",
  //   departureTime: "",
  // },
  {
    waitTime: new Date(
      new Date(CURRENT_DATE.getTime() + 7 * ONE_MINUTE_MS).getTime() -
        RESERVE_OFFSET
    ),
    id: shortid.generate(),
    name: "john cena",
    party: "10",
    phone: "565-565-7894",
    table: "2A",
    notes: "",
    tableAssigned: "",
    reserveTime: new Date(CURRENT_DATE.getTime() + 7 * ONE_MINUTE_MS),
    seatedTime: "",
    departureTime: "",
  },
  // {
  //   waitTime: new Date(
  //     new Date(CURRENT_DATE.getTime() + 30 * ONE_MINUTE_MS).getTime() -
  //       RESERVE_OFFSET
  //   ),
  //   id: shortid.generate(),
  //   name: "Penny Cilin",
  //   party: "1",
  //   phone: "456-789-1238",
  //   table: "",
  //   notes: "",
  //   tableAssigned: "",
  //   reserveTime: new Date(CURRENT_DATE.getTime() + 30 * ONE_MINUTE_MS),
  //   seatedTime: "",
  //   departureTime: "",
  // },
  // {
  //   waitTime: new Date(
  //     new Date(CURRENT_DATE.getTime() - 8 * ONE_MINUTE_MS).getTime() -
  //       RESERVE_OFFSET
  //   ),
  //   id: shortid.generate(),
  //   name: "Harambe",
  //   party: "16",
  //   phone: "456-789-1238",
  //   table: "6H",
  //   notes: "",
  //   tableAssigned: "",
  //   reserveTime: new Date(CURRENT_DATE.getTime() - 8 * ONE_MINUTE_MS),
  //   seatedTime: "",
  //   departureTime: "",
  // },
  // {
  //   waitTime: new Date(CURRENT_DATE.getTime() - 32 * ONE_MINUTE_MS),
  //   id: shortid.generate(),
  //   seated: true,
  //   name: "t pain",
  //   party: "1",
  //   phone: "456-789-1238",
  //   table: "",
  //   notes: "",
  //   tableAssigned: "",
  //   reserveTime: "",
  //   seatedTime: "",
  //   departureTime: "",
  // },
].sort((a, b) => {
  const wtA = a.waitTime.getTime();
  const wtB = b.waitTime.getTime();

  if (wtA > wtB) return 1;
  else if (wtA < wtB) return -1;
  else return 0;
});

const GuestListContainer = styled.div`
  position: relative;
  /* margin: 1rem; */
  width: 100%;
  height: 100%;
  /* padding: 1rem; */

  /* background-color: ${({ theme }) => theme.colors.background}; */
  /* border-radius: 4px; */
  overflow-y: auto;

  /* HIDE BASED OFF sidebarOpen */
  /* overflow-y: hidden; */
  ${({ sidebarOpen }) =>
    !sidebarOpen
      ? css`
          overflow-y: hidden;
        `
      : null}

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const ListContainer = styled.ul`
  width: 100%;
  padding: 0 0.5rem;

  /* flex: 1; */

  display: flex;
  flex-direction: column;
`;

const GLExtras = styled.div`
  width: 100%;
  /* margin: 0 1rem; */

  background-color: ${({ theme }) => theme.colors.surface};

  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: ${({ glExtrasOpen }) => (glExtrasOpen ? "1rem" : "0")}; */
`;

const Divider = styled.div`
  /* background-color: red; */
  height: 2rem;
  width: 100%;
  padding: 0 0.5rem;

  display: flex;
  align-items: center;

  cursor: pointer;
  margin: 0.5rem 0;

  .title {
    white-space: nowrap;
    height: 100%;
    padding: 0 1rem;
    border-radius: 5rem;
    color: ${({ theme }) => theme.colors.onBackground};
    background-color: ${({ theme }) => theme.colors.background};
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 2px solid ${({ theme }) => theme.colors.outline};
  }

  .line {
    background-color: ${({ theme }) => theme.colors.background};
    height: 3px;
    flex: 1;
    margin-left: 0.5rem;
  }

  button {
    /* background-color: green; */
    height: 2rem;
    width: 2rem;
    min-height: 2rem;
    min-width: 2rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.onBackground};
    font-weight: bold;
    margin-left: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 2px solid ${({ theme }) => theme.colors.outline};

    svg {
      /* border-radius: 50%; */

      height: 1.8rem;
      width: 1.8rem;

      transition: transform 200ms ease-in-out;

      transform: rotate(${({ expand }) => (expand ? 0 : -180)}deg);

      path {
        fill: ${({ theme }) => theme.colors.onBackground};
      }
    }
  }

  &:hover {
    .title {
      color: ${({ theme }) => theme.colors.primary};
    }
    button {
      color: ${({ theme }) => theme.colors.primary};

      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

const AddText = styled.p`
  /* background-color: red; */
  color: ${({ theme }) => theme.colors.error};
  font-weight: bold;
  font-style: italic;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuestList = () => {
  const [guestList, setGuestList] = useState(GUESTLIST);
  // const [guestList, setGuestList] = useState([]);
  const [seatedOpen, setSeatedOpen] = useState(true);
  const [mustServeOpen, setMustServeOpen] = useState(true);
  const [finishedOpen, setFinishedOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(false);
  const sidebarOpen = useRecoilValue(sidebarState);

  useEffect(() => {
    let timer = null;

    timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const compareByWaitTime = (a, b) => {
    const wtA = a.waitTime.getTime();
    const wtB = b.waitTime.getTime();

    if (wtA > wtB) return 1;
    else if (wtA < wtB) return -1;
    else return 0;
  };

  const addGuestItem = (guestItem) => {
    setGuestList([...guestList, guestItem].sort(compareByWaitTime));
  };

  const updateGuestItem = (guestItem) => {
    const deleteIndex = guestList.findIndex(
      (guest, i) => guest.id === guestItem.id
    );

    const updatedItems = [
      ...guestList.slice(0, deleteIndex),
      ...guestList.slice(deleteIndex + 1, guestList.length),
      guestItem,
    ].sort(compareByWaitTime);

    setGuestList(updatedItems);
  };

  return (
    <GuestListContainer sidebarOpen={sidebarOpen}>
      <DrawerHeader
        headerTitle="Guest list"
        drawerComponent1={
          <GLExtras>filter, sort, other extra features here</GLExtras>
        }
        drawerComponent2={
          <AddGuest
            handleChange={(guestItem) => {
              addGuestItem(guestItem);
              // setAddGuestOpen(false);
            }}
            // addGuestOpen={addGuestOpen}
          />
        }
        // handleChange1={(state) => setGlExtrasOpen(state)}
        // handleChange2={(state) => setAddGuestOpen(state)}
      />

      {/* ----------------   THE WAITING LIST  ----------------*/}
      <Divider
        expand={mustServeOpen}
        onClick={() => {
          setMustServeOpen(!mustServeOpen);
        }}
      >
        <h2 className="title">Waiting</h2>
        <button>{guestList.filter((guest) => !guest.seatedTime).length}</button>
        <div className="line"></div>

        <button>
          <MdExpandLess />
        </button>
      </Divider>
      {mustServeOpen && (
        <ListContainer className="guest-list">
          {/* {guestList.length < 3 && (
            <AddText>(try adding more guests with the + button)</AddText>
          )} */}
          {guestList
            .filter((guest) => !guest.seatedTime)
            .map((guest, i) => (
              <GuestItem
                key={guest.id}
                line={i + 1}
                guestInfo={guest}
                currentTime={currentTime}
                handleChange={updateGuestItem}
              />
            ))}
        </ListContainer>
      )}

      {/* ----------------   THE SEATED LIST  ----------------*/}
      <Divider
        expand={seatedOpen}
        onClick={() => {
          setSeatedOpen(!seatedOpen);
        }}
      >
        <h2 className="title">Seated</h2>
        <button>
          {
            guestList.filter(
              (guest) => guest.seatedTime && !guest.departureTime
            ).length
          }
        </button>
        <div className="line"></div>
        <button>
          <MdExpandLess />
        </button>
      </Divider>
      {seatedOpen && (
        <ListContainer className="guest-list">
          {guestList
            .filter((guest) => guest.seatedTime && !guest.departureTime)
            .map((guest, i) => (
              <GuestItem
                key={guest.id}
                guestInfo={guest}
                currentTime={currentTime}
                handleChange={updateGuestItem}
              />
            ))}
        </ListContainer>
      )}
      {/* ----------------   THE FINISHED LIST  ----------------*/}
      <Divider
        expand={finishedOpen}
        onClick={() => {
          setFinishedOpen(!finishedOpen);
        }}
      >
        <h2 className="title">Finished</h2>
        <button>
          {guestList.filter((guest) => guest.departureTime).length}
        </button>
        <div className="line"></div>
        <button>
          <MdExpandLess />
        </button>
      </Divider>
      {finishedOpen && (
        <ListContainer className="guest-list">
          {guestList
            .filter((guest) => guest.departureTime)
            .map((guest, i) => (
              <GuestItem
                key={guest.id}
                guestInfo={guest}
                currentTime={currentTime}
                handleChange={updateGuestItem}
              />
            ))}
        </ListContainer>
      )}
    </GuestListContainer>
  );
};

export default GuestList;
