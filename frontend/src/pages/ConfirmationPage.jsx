import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
// custom components:
import Card from "../components/Card";

import { db } from "../firebase";

import { TiLocation } from "react-icons/ti";
import { RiTimeFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const RegisterContainer = styled.div`
  /* background-color: red; */
  display: flex;

  @media (max-width: 1050px) {
    flex-direction: column;
    align-items: center;
  }

  ${({ reserve }) =>
    reserve
      ? css`
          /* justify-content: flex-start; */
          justify-content: center;
          /* align-items: center; */
        `
      : css`
          justify-content: center;
          align-items: center;
        `}
`;

const RegisterCard = styled(Card)`
  @media (max-width: 500px) {
    /* width: 90%; */
    padding: 1rem;
    /* background-color: red; */
  }

  ${({ reserve, theme }) =>
    reserve
      ? css`
          border-radius: 0;
          border: 0px;
          border-right: 1px solid ${theme.colors.outline};
        `
      : css``}
`;

const DetailSlide = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;

  .icon-wrapper {
    margin-right: 1rem;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 2.75rem;
    min-height: 2.75rem;

    font-size: 2rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ConfirmSlide = styled(DetailSlide)`
  background-color: ${({ theme }) => rgba(theme.colors.correct, 0.3)};

  border: 1px solid ${({ theme }) => theme.colors.correct};

  p {
    color: ${({ theme }) => theme.colors.correct};
    font-weight: bold;
  }
`;

const LocationSlide = styled(DetailSlide)`
  background-color: ${({ theme }) => theme.colors.primary};
`;
const CheckIcon = styled(FaCheck)`
  width: 2rem;
  height: 2rem;
  path {
    fill: ${({ theme }) => theme.colors.correct};
  }
`;

const LocationIcon = styled(TiLocation)`
  width: 2.5rem;
  height: 2.5rem;
  path {
    fill: white;
  }
`;

const PersonIcon = styled(BsFillPersonFill)`
  width: 2rem;
  height: 2rem;
  path {
    fill: white;
  }
`;
const TimeIcon = styled(RiTimeFill)`
  width: 2rem;
  height: 2rem;
  path {
    /* fill: white; */
  }
`;

const ResData = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: bold;
  }

  h3 {
    font-style: italic;
  }
`;

const ONE_MINUTE_MS = 60000;
const RESERVE_OFFSET = 45 * ONE_MINUTE_MS;

const INITIAL_CUS_DATA = {
  departureTime: "",
  id: "",
  name: "",
  party: "",
  phone: "",
  reserveTime: "",
  restaurantId: "",
  seatedTime: "",
  table: { id: "", label: "" },
  tabledAssigned: "",
  waitTime: "",
};

const ConfirmationPage = ({ match, ...props }) => {
  const [line, setLine] = useState(0);
  const [customerData, setCustomerData] = useState(INITIAL_CUS_DATA);
  const [restaurantData, setRestaurantData] = useState({
    uid: "",
    restaurantName: "",
    address: "",
    phone: "",
    maxPartySize: "",
  });

  const dbRef = db.collectionGroup("guestlist");

  useEffect(() => {
    // console.log("restauran", match.params.id);
    dbRef
      .where("id", "==", match.params.id)
      .get()
      .then((res) => {
        // console.log("hey my info", res.query.get());

        // console.log("empty", res.empty);

        if (!res.empty) {
          const stuff = [];
          // console.log("my info yellow", res);
          res.forEach((i) => {
            const data = { ...i.data() };
            let { departureTime, reserveTime, seatedTime, waitTime } = data;
            if (departureTime.toDate) departureTime = departureTime.toDate();
            if (reserveTime.toDate) reserveTime = reserveTime.toDate();
            if (seatedTime.toDate) seatedTime = seatedTime.toDate();
            if (waitTime.toDate) waitTime = waitTime.toDate();

            const formattedData = {
              ...data,
              departureTime,
              reserveTime,
              seatedTime,
              waitTime,
            };
            stuff.push(formattedData);
          });

          setCustomerData(stuff[0]);
        }
      })
      .catch((e) => console.log("error", e));
  }, []);

  useEffect(() => {
    // console.log("restaurant data is set", customerData.restaurantId);

    if (customerData.restaurantId) {
      db.collection("restaurants")
        .doc(customerData.restaurantId)
        .get()
        .then((res) => {
          // console.log("here comes my restaurant data", res);
          setRestaurantData(res.data());
        })
        .catch((e) => console.log("res error", e));
    }
  }, [customerData]);

  useEffect(() => {
    let unsubFromGuestlist = () => {};

    if (customerData.restaurantId) {
      unsubFromGuestlist = db
        .collection("restaurants")
        .doc(customerData.restaurantId)
        .collection("guestlist")
        .where("seatedTime", "==", "")
        .onSnapshot((res) => {
          // console.log("guestlist data");

          const gl = [];
          res.forEach((i) => {
            // console.log("gl", i.data());
            const data = { ...i.data() };
            gl.push({ ...data, waitTime: data.waitTime.toDate().getTime() });
            // gl.push({
            //   waitTime2: data.waitTime.toDate(),
            //   waitTime: data.waitTime.toDate().getTime(),
            //   name: data.name,
            // });
          });

          gl.sort((a, b) => a.waitTime - b.waitTime);

          // console.log("gl", gl);

          const line = gl.findIndex((el) => el.id === match.params.id);
          // console.log("palce in line", line);

          setLine(line + 1);
        });
    }

    return () => {
      unsubFromGuestlist();
    };
  }, [restaurantData]);

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

  const getCurrentTimeDelta = (time) => {
    const ONE_MINUTE = 60;
    const ONE_HOUR = 3600;

    const currenttime = new Date();
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

  const getGuestType = () => {
    // let guestType = "";
    const { reserveTime, waitTime } = customerData;
    // console.log("r", reserveTime, "w", waitTime);
    if (reserveTime) {
      // const reservation = reserveTime;

      const test = formatReserveTime(reserveTime);

      return `Reservation on ${test}`;
    } else if (waitTime) {
      // console.log("waitTime", new Date(waitTime.seconds));
      return `Waitlisted ${getCurrentTimeDelta(waitTime)} ago`;
    } else return "nothing";
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <ConfirmSlide>
          <div className="icon-wrapper">
            <CheckIcon />
          </div>
          <p>Congratulations! Your spot has been confirmed!</p>
        </ConfirmSlide>
        <LocationSlide>
          <div className="icon-wrapper">
            <LocationIcon />
          </div>
          <ResData>
            <h2>
              {restaurantData.restaurantName
                ? restaurantData.restaurantName
                : "the restaurant has not provided a name yet"}
            </h2>
            <h3>
              {restaurantData.address
                ? restaurantData.address
                : "the restaurant has no provided an address yet"}
            </h3>
            <h4>
              {restaurantData.phoneNumber
                ? restaurantData.phoneNumber
                : "the restaurant has no provided an phonenumber yet"}
            </h4>
          </ResData>
        </LocationSlide>

        <DetailSlide>
          <div className="icon-wrapper">
            <PersonIcon />
          </div>
          <ResData>
            <h2>{customerData.name ? customerData.name : "n/a"}</h2>
            <h3>Party of {customerData.party ? customerData.party : "n/a"}</h3>
            <h4>{getGuestType()}</h4>
          </ResData>
        </DetailSlide>

        <DetailSlide
          css={css`
            margin-bottom: 0;
          `}
        >
          <div className="icon-wrapper">{line !== 0 ? line : <TimeIcon />}</div>
          <ResData>
            <h2>
              {line !== 0 ? "place in line" : "You have already been seated!"}
            </h2>
            {/* <h3>Party of {customerData.party ? customerData.party : "n/a"}</h3>
            <h4>{getGuestType()}</h4> */}
          </ResData>
        </DetailSlide>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default ConfirmationPage;
