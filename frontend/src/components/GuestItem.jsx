import React, { useState, useEffect } from "react";

import { useDrag, DragPreviewImage } from "react-dnd";
import { ItemTypes } from "../utils/draggables";
import { db } from "../firebase";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";
import GlowButton from "./buttons/GlowButton";
import DetailBit from "./DetailBit";

// icons:
import { ImCheckmark } from "react-icons/im";
import { useTheme } from "emotion-theming";
import { useAuth } from "../contexts/AuthContext";

const ItemWrapper = styled.li`
  width: 100%;
  margin: 0.25rem 0;
`;

const GuestItemContainer = styled.div`
  /* box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.10); */

  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  padding: 0 0.75rem;
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  cursor: pointer;

  height: 3.5rem;
  min-height: 3.5rem;

  overflow: hidden;

  display: flex;
  align-items: center;

  .guest-name {
    cursor: inherit;

    color: ${({ theme }) => theme.colors.onBackground};
    /* font-style: italic; */
    text-transform: capitalize;
    flex: 1;

    white-space: nowrap;

    display: flex;
    /* justify-content: center; */
    margin-left: 2rem;
    user-select: none;
  }

  .waited-time {
    color: ${({ theme }) => theme.colors.onBackground};
    font-style: italic;
    user-select: none;
  }
`;

const ItemDetails = styled.div`
  /* this conditional bg-color is for solving a bug of mobile only */
  background-color: ${({ theme, itemExpand }) =>
    itemExpand ? theme.colors.surface : theme.colors.outline};

  height: ${({ itemExpand }) => (itemExpand ? "24rem" : 0)};
  padding: ${({ itemExpand }) => (itemExpand ? "1rem" : 0)};

  width: 100%;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.outline};

  overflow: hidden;
  transition-property: height, padding;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  flex-direction: column;
`;

const fontColor = css`
  color: inherit;

  .label,
  .value {
    color: inherit;
  }

  .label {
    font-weight: bold;
  }

  .value {
    font-size: 1.05rem;
  }
`;

const spacing = css`
  margin-bottom: 1.5rem;
`;

const MainInfoWrapper = styled.div`
  color: inherit;
  width: 100%;
  /* background-color: red; */

  display: flex;
  flex-direction: row;

  ${spacing};
`;

const MainInfo = styled.div`
  ${fontColor}

  /* background-color: lightblue; */
  flex: 1;

  .value {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const SubInfo = styled.div`
  ${fontColor}
  display: flex;

  margin-bottom: 0.5rem;
  .label,
  .value {
    flex: 1;
  }
`;

const PhoneInfo = styled.div`
  ${fontColor}
`;

const Notes = styled.div`
  ${fontColor}
  padding-top: 1rem;
  border-top: 2px solid ${({ theme }) => theme.colors.outline};

  .label {
    margin-bottom: 0.5rem;
  }

  .value {
    /* background-color: red; */
    height: 6rem;
    overflow: auto;
  }
`;

const GuestTypeBit = styled(DetailBit)`
  border-radius: 4px;
  /* margin-left: 0.4rem; */
  cursor: inherit;

  background-color: ${({ theme, text }) =>
    text.toLowerCase() === "r" ? theme.colors.error : theme.colors.primary};

  p {
    color: white;
  }
`;

const PartySizeBit = styled(DetailBit)`
  cursor: inherit;

  margin-left: 2rem;
  background-color: ${({ theme }) => rgba(theme.colors.onBackground, 0.9)};
  background-color: transparent;
  box-shadow: none;

  p {
    color: ${({ theme }) => theme.colors.onBackground};
  }
`;

const DumDiv = styled.div`
  width: 10rem;
  height: 5rem;

  background-color: red;
  opacity: 1;
`;

const GuestItem = ({
  guestInfo,
  currentTime,
  line,

  handleChange = () => {},
  ...props
}) => {
  const [itemExpand, setItemExpand] = useState(false);
  const theme = useTheme();
  const [
    { isDragging, end, coords, opacity, ...dragProps },
    drag,
    preview,
  ] = useDrag({
    item: { type: ItemTypes.GUEST, data: { ...guestInfo } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      end: monitor.getDropResult(),
      opacity: monitor.isDragging() ? 0.1 : 1,
    }),
  });
  const { currentUser } = useAuth();
  const guestlistRef = db
    .collection("restaurants")
    .doc(currentUser.uid)
    .collection("guestlist");

  const updateGuestItem = async (data) => {
    const { id } = guestInfo;
    try {
      await guestlistRef.doc(id).update(data);
    } catch (e) {
      console.log("guest item error", e);
    }
  };

  const getCurrentTimeDelta = (time) => {
    // if (time.toDate) {
    //   time = time.toDate();
    // }

    // time.toDate();
    const ONE_MINUTE = 60;
    const ONE_HOUR = 3600;
    // console.log("time", time);

    // const hello = time.toDate();
    // console.log("hello", hello);

    const currenttime = currentTime ? currentTime : new Date();
    const timeDelta = Math.floor(
      (currenttime.getTime() - time.getTime()) / 1000
    );

    if (timeDelta < -ONE_HOUR)
      return `in ${Math.floor((-1 * timeDelta) / ONE_HOUR)}h ${Math.floor(
        ((-1 * timeDelta) % ONE_HOUR) / ONE_MINUTE
      )}m`;
    else if (timeDelta < 0)
      return `in ${-1 * Math.floor(timeDelta / ONE_MINUTE)}m`;
    else if (timeDelta < ONE_MINUTE) return `< 1m`;
    else if (timeDelta < ONE_HOUR)
      return `${Math.floor(timeDelta / ONE_MINUTE)}m`;
    else {
      return `${Math.floor(timeDelta / ONE_HOUR)}h ${Math.floor(
        (timeDelta % ONE_HOUR) / ONE_MINUTE
      )}m`;
    }
  };

  const getReservationStatus = (time) => {
    // if (time.toDate) {
    //   time = time.toDate();
    // }

    const ONE_MINUTE = 60;
    const ONE_HOUR = 3600;

    const currenttime = currentTime ? currentTime : new Date();
    const timeDelta = Math.floor(
      (currenttime.getTime() - time.getTime()) / 1000
    );

    if (timeDelta < -ONE_HOUR)
      return `in ${Math.floor((-1 * timeDelta) / ONE_HOUR)}h ${Math.floor(
        ((-1 * timeDelta) % ONE_HOUR) / ONE_MINUTE
      )}m`;
    else if (timeDelta < 0)
      return `in ${-1 * Math.floor(timeDelta / ONE_MINUTE)}m`;
    else if (timeDelta < ONE_MINUTE) return `OVERDUE`;
    else if (timeDelta < ONE_HOUR)
      return `OVERDUE by ${Math.floor(timeDelta / ONE_MINUTE)}m`;
    else {
      return `OVERDUE by ${Math.floor(timeDelta / ONE_HOUR)}h ${Math.floor(
        (timeDelta % ONE_HOUR) / ONE_MINUTE
      )}m`;
    }
  };

  const formatPhone = (phoneNumber) => {
    var cleaned = ("" + phoneNumber).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + " " + match[3];
    }
    return null;
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = ("0" + minutes).slice(-2);
    var strTime = hours + ":" + minutes + ampm;
    return strTime;
  }

  const formatReserveTime = (datetime) => {
    // if (datetime.toDate) {
    //   datetime = datetime.toDate();
    // }
    const date =
      datetime.getMonth() +
      1 +
      "." +
      datetime.getDate() +
      "." +
      datetime.getFullYear();

    const time24H = datetime.getHours() + ":" + datetime.getMinutes();
    const time12H = formatAMPM(datetime);

    return date + " @ " + time12H;
  };

  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true });
  // }, []);

  return (
    <ItemWrapper {...props} ref={drag}>
      {/* <DumDiv
        ref={preview}
        css={css`
          opacity: ${opacity};
        `}
      ></DumDiv> */}
      <GuestItemContainer
        ref={preview}
        itemExpand={itemExpand}
        onClick={(e) => {
          setItemExpand(!itemExpand);
        }}
        // onTouchStart={() => {
        //   setItemExpand(!itemExpand);
        // }}
      >
        <GuestTypeBit text={guestInfo.reserveTime ? "r" : "w"} />
        <PartySizeBit text={guestInfo.party} />
        <p className="guest-name">{guestInfo.name}</p>

        {itemExpand && !guestInfo.seatedTime && !guestInfo.departureTime && (
          <GlowButton
            icon={ImCheckmark}
            color={theme.colors.correct}
            effectOpacity={0.25}
            onClick={(e) => {
              e.stopPropagation();
              setItemExpand(!itemExpand);
              // handleChange({ ...guestInfo, seatedTime: new Date() });
              updateGuestItem({ ...guestInfo, seatedTime: new Date() });
            }}
          />
        )}

        {!itemExpand && !guestInfo.seatedTime && !guestInfo.departureTime && (
          <p className="waited-time">
            {guestInfo.reserveTime
              ? getReservationStatus(guestInfo.reserveTime)
              : getCurrentTimeDelta(guestInfo.waitTime)}
          </p>
        )}

        {/* Render button for seated items and seated time */}
        {itemExpand && guestInfo.seatedTime && !guestInfo.departureTime && (
          <GlowButton
            icon={ImCheckmark}
            color={theme.colors.error}
            effectOpacity={0.25}
            onClick={(e) => {
              e.stopPropagation();
              setItemExpand(!itemExpand);
              // handleChange({ ...guestInfo, departureTime: new Date() });
              updateGuestItem({ ...guestInfo, departureTime: new Date() });
            }}
          />
        )}
        {!itemExpand && guestInfo.seatedTime && !guestInfo.departureTime && (
          <p className="waited-time">
            {getCurrentTimeDelta(guestInfo.seatedTime)}
          </p>
        )}
      </GuestItemContainer>
      <ItemDetails itemExpand={itemExpand}>
        <MainInfoWrapper>
          <MainInfo>
            {!guestInfo.reserveTime && (
              <React.Fragment>
                <p className="label">Waited For:</p>
                <p className="value">
                  {guestInfo.waitTime
                    ? getCurrentTimeDelta(guestInfo.waitTime)
                    : null}
                </p>
              </React.Fragment>
            )}
            {guestInfo.reserveTime && (
              <React.Fragment>
                <p className="label">Reservation:</p>
                <p className="value">
                  {formatReserveTime(guestInfo.reserveTime)}
                </p>
              </React.Fragment>
            )}
          </MainInfo>

          {!guestInfo.reserveTime && (
            <MainInfo>
              <p className="label"># in line:</p>
              <p className="value">{line ? line : "Seated"}</p>
            </MainInfo>
          )}
        </MainInfoWrapper>
        <SubInfo>
          <p className="label">Table Requested:</p>
          <p className="value">{guestInfo.table ? guestInfo.table : "Any"}</p>
        </SubInfo>
        <SubInfo css={spacing}>
          <p className="label">Table Assigned:</p>
          <p className="value">
            {guestInfo.tableAssigned ? guestInfo.tableAssigned : "N/A"}
          </p>
        </SubInfo>
        <PhoneInfo
          css={css`
            margin-bottom: 1rem;
          `}
        >
          <SubInfo>
            <p className="label">Phone #:</p>
            <p className="value">{formatPhone(guestInfo.phone)}</p>
          </SubInfo>
        </PhoneInfo>
        <Notes>
          <p className="label">Notes:</p>
          <p className="value">
            {guestInfo.notes
              ? guestInfo.notes
              : "Guest did not provide feedback."}
          </p>
        </Notes>
      </ItemDetails>
    </ItemWrapper>
  );
};

export default GuestItem;
