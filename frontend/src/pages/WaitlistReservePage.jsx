import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import Input from "../components/inputs/Input";
import Card from "../components/Card";
import Button from "../components/buttons/Button";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/UserState";
import SelectSlider from "../components/inputs/SelectSlider";
import SeatPicker from "../components/SeatPicker";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, useLocation } from "react-router-dom";
import { TiLocation } from "react-icons/ti";

const INITIAL_ACC_INFO = {
  restaurantName: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
  settings: {
    capacity: 50,
  },
};

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

const FormContainer = styled.form`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;

const SpacedInput = styled(Input)`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const RegisterButton = styled(Button)`
  width: 100%;
  height: 3.5rem;
`;

const ReservationButton = styled(Button)`
  width: 100%;
  height: 3.5rem;
  margin-bottom: 1rem;

  background-color: ${({ theme }) => theme.colors.background};

  .btn-text {
    color: ${({ theme }) => theme.colors.onBackground};
  }

  &:hover {
    .btn-text {
      color: ${({ theme }) => theme.colors.surface};
    }
  }
`;

const P = styled.p`
  font-style: italic;
  /* font-weight: bold; */
  color: ${({ theme }) => theme.colors.onBackground};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  letter-spacing: 1px;

  span {
    font-weight: bold;
    padding: 0 0.35rem;

    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    /* font-weight: bold; */
    text-decoration: underline;
  }

  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const Confirm = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;

  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const SeatPickerContainer = styled.div`
  /* width: 40rem; */
  /* height: 40rem; */
  width: 100%;
  height: 100%;
  min-height: 40rem;
  padding: 0.5rem;

  background-color: ${({ theme }) => theme.colors.surface};
  /* border: 1px solid ${({ theme }) => theme.colors.outline}; */
  /* border-bottom: 4px solid ${({ theme }) => theme.colors.outline}; */
`;

const ResWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 1rem 0;

  svg {
    margin-right: 1rem;
    width: 2.75rem;
    height: 2.75rem;
    path {
      fill: white;
    }
  }

  display: flex;
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
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ONE_MINUTE_MS = 60000;
const RESERVE_OFFSET = 45 * ONE_MINUTE_MS;

const RegisterPage = ({ match, ...props }) => {
  const [info, setInfo] = useState("");
  const [seatingOptions, setSeatingOptions] = useState([]);
  const [reserve, setReserve] = useState(false);
  const [seating, setSeating] = useState("");
  const [restaurantData, setRestaurantData] = useState({
    uid: "",
    restaurantName: "",
    address: "",
    phone: "",
    maxPartySize: "",
  });
  const { register, handleSubmit, errors, watch } = useForm();
  // const { currentUser } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const resRef = db.collection("restaurants");
  const [partySize, setPartySize] = useState({ id: 1, label: 1 });

  const name = {
    required: { value: true, message: "name required" },
  };

  const phoneReqs = {
    required: { value: true, message: "phone # required" },
  };

  const partyReqs = {
    min: { value: 1, message: "greater than 0" },
    max: { value: 15, message: "less than 16" },
  };

  const reservationReqs = {
    required: { value: true, message: "phone # required" },
  };

  const onSubmit = async (data) => {
    // setInfo(data);
    // console.log("lsjdflkj, data", data, seating);

    // resRef.doc(match.params.id).collection("layout");

    const newGuest = {
      ...data,
      id: resRef.doc().id,
      table: { id: seating.id, label: seating.label },
      // id: shortid.generate(),
      tabledAssigned: "",
      departureTime: "",
      seatedTime: "",
      party: partySize.label,

      waitTime: data.reserveTime
        ? new Date(new Date(data.reserveTime).getTime() - RESERVE_OFFSET)
        : new Date(),
      reserveTime: data.reserveTime ? new Date(data.reserveTime) : "",
    };

    // if (!snapShot.exists) {
    // console.log("not existing");

    // handleChange(newGuest);
    // console.log("new customer", newGuest);
    try {
      // setLoading(true);
      console.log("newGuest self", newGuest);
      await resRef
        .doc(match.params.id)
        .collection("guestlist")
        .doc(newGuest.id)
        .set(newGuest);
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      console.log("error creating res", e);
    }

    // setInfo("");
  };

  useEffect(() => {
    resRef
      .doc(match.params.id)

      .get()
      .then((res) => {
        console.log("hey my info", res.data());
        setRestaurantData(res.data());
        // const items = [];
        // res.forEach((i) => {
        //   const newItem = i.data();
        //   items.push({ ...newItem, label: newItem.data.label });
        // });
        // setSeatingOptions(items);
        // setSeatingSliderOptions(items);
      })
      .catch((e) => console.log("error", e));
  }, []);

  useEffect(() => {
    resRef
      .doc(match.params.id)
      .collection("layout")
      .get()
      .then((res) => {
        const items = [];
        res.forEach((i) => {
          const newItem = i.data();
          items.push({ ...newItem, label: newItem.data.label });
        });
        setSeatingOptions(items);
        // setSeatingSliderOptions(items);
      })
      .catch((e) => console.log("error", e));
  }, [location]);

  const createPartySizeList = (size = 0) => {
    console.log("size test", size);
    const arr = [];
    for (let i = 1; i <= size; i++) {
      arr.push({ id: i, label: i });
    }
    console.log("famous last array 2", arr);

    return arr;
  };
  return (
    <RegisterContainer reserve={reserve}>
      <RegisterCard reserve={reserve}>
        {/* noValidate disables the html5 validation and its ugly messages */}
        {/* {JSON.stringify(restaurantData)} */}
        {/* <Title>Add yourself to the guestlist!</Title> */}
        <ResWrapper>
          <TiLocation />
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
          </ResData>
        </ResWrapper>
        {!info ? (
          <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
            <SpacedInput
              type="text"
              htmlFor="name"
              label="name"
              name="name"
              ref={register(name)}
              error={errors.name && errors.name.message}
            />

            <SpacedInput
              type="phone"
              htmlFor="phone"
              label="phone #"
              name="phone"
              ref={register(phoneReqs)}
              error={errors.phone && errors.phone.message}
            />

            {/* <SpacedInput
              type="number"
              htmlFor="party"
              label="party size"
              name="party"
              ref={register(partyReqs)}
              error={errors.party && errors.party.message}
              min={1}
              max={restaurantData.maxPartySize}
            /> */}

            <SelectSlider
              label="party size"
              // options={PARTY_ARRAY}
              options={createPartySizeList(
                restaurantData.maxPartySize ? restaurantData.maxPartySize : 15
              )}
              value={partySize}
              handleChange={(val) => {
                // setGuest({ ...guest, party: val.label });
                console.log("handchange", val);
                setPartySize(val);
              }}
              css={css`
                margin-bottom: 1rem;
              `}
            />

            <P
              onClick={(e) => {
                e.preventDefault();
                setReserve(!reserve);
                console.log();
              }}
            >
              {!reserve ? (
                <React.Fragment>
                  I want to<span>reserve</span> not waitlist
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Nevermind, I am going to waitlist
                </React.Fragment>
              )}
            </P>

            {reserve && (
              <React.Fragment>
                <SpacedInput
                  type="datetime-local"
                  htmlFor="reservation"
                  label="reservation date&time"
                  name="reserveTime"
                  ref={register(reservationReqs)}
                  error={errors.reserveTime && errors.reserveTime.message}
                />

                <SelectSlider
                  label="table"
                  options={seatingOptions}
                  // options={[
                  //   "A",
                  //   "B",
                  //   "C",
                  //   "D",
                  //   "E",
                  //   "F",
                  //   "G",
                  //   "B2",
                  //   "ALT",
                  //   "F4",
                  // ]}
                  handleChange={setSeating}
                  value={seating}
                  css={css`
                    margin-bottom: 1rem;
                  `}
                ></SelectSlider>
              </React.Fragment>
            )}

            <ButtonContainer>
              <RegisterButton
                type="submit"
                text={reserve ? "confirm reservation" : "waitlist"}
              />
            </ButtonContainer>
          </FormContainer>
        ) : (
          <Confirm>Confirmed</Confirm>
        )}
      </RegisterCard>
      {reserve && (
        <SeatPickerContainer>
          <SeatPicker
            options={seatingOptions}
            handleChange={setSeating}
            value={seating}
          />
        </SeatPickerContainer>
      )}
    </RegisterContainer>
  );
};

export default RegisterPage;
