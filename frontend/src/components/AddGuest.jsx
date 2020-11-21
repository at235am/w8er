import React, { useState, useEffect } from "react";
import { db } from "../firebase";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import FormInput from "./inputs/FormInput";
import Button from "./buttons/Button";
import SelectSlider from "./inputs/SelectSlider";
import shortid from "shortid";
import Input from "./inputs/Input";
import { useAuth } from "../contexts/AuthContext";

const ONE_MINUTE_MS = 60000;
const RESERVE_OFFSET = 45 * ONE_MINUTE_MS;

const spacing = css`
  margin-bottom: 1rem;
`;

const AddGuestContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  width: 100%;

  color: ${({ theme }) => theme.colors.onBackground};
`;

const AddGuestButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;

  margin-top: 2.5rem;

  color: ${({ theme }) => theme.colors.onBackground};

  transition: height 200ms ease-out;

  &:hover {
    .btn-text {
      color: white;
    }
  }
`;
const SpacedInput = styled(Input)`
  margin-bottom: 1rem;
`;
const INITIAL_GUEST = {
  name: "", // easy (completed)
  party: "", // hard (completed)
  phone: "", // hard
  table: "", // hard (completed)
  notes: "", // text area easy
  tableAssigned: "",
  reserveTime: "", // time that the guest reserves (use this variable to check if waitlist or reservation)
  waitTime: "", // time that the guest STARTS waiting (when the entry is confirmed)
  seatedTime: "", // time that the guest is seated
  departureTime: "", // time that the guest finishes eating and leaves
};

const PARTY_ARRAY = [...Array(50).keys()];

// const TABLE_ARRAY = (() => {
//   const array = [];

//   for (let i = 0; i < 25; i++) {
//     const randomLetter = String.fromCharCode(
//       Math.floor(Math.random() * (97 - 122) + 122)
//     ).toUpperCase();

//     const randomNum = Math.floor(Math.random() * (0 - 9) + 9);
//     array.push(`${randomLetter}${randomNum}`);
//   }

//   return array;
// })();

const TABLE_ARRAY = ["A", "B", "C", "D", "E", "F", "G", "B2", "ALT", "F4"];

const AddGuest = React.forwardRef(({ handleChange, ...props }, ref) => {
  const [guest, setGuest] = useState(INITIAL_GUEST);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const resRef = db
    .collection("restaurants")
    .doc(currentUser.uid)
    .collection("guestlist");

  const updateGuestList = async (e) => {
    e.preventDefault();

    // const snapShot = await resRef.get();

    const newGuest = {
      ...guest,
      // id: shortid.generate(),
      id: resRef.doc().id,
      waitTime: guest.reserveTime
        ? new Date(new Date(guest.reserveTime).getTime() - RESERVE_OFFSET)
        : new Date(),
      reserveTime: guest.reserveTime ? new Date(guest.reserveTime) : "",
    };

    // if (!snapShot.exists) {
    // console.log("not existing");

    // handleChange(newGuest);
    // console.log("new customer", newGuest);
    try {
      setLoading(true);
      // const
      await resRef.doc(newGuest.id).set(newGuest);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("error creating res", e);
    }
    setGuest(INITIAL_GUEST);
    if (props.toggleDrawer) props.toggleDrawer();
    // }
  };

  return (
    <AddGuestContainer
      {...props}
      ref={ref}
      className="add-guest-container"
      // onSubmit={(e) => {
      //   e.preventDefault();

      //   const newGuest = {
      //     ...guest,
      //     id: shortid.generate(),
      //     waitTime: guest.reserveTime
      //       ? new Date(new Date(guest.reserveTime).getTime() - RESERVE_OFFSET)
      //       : new Date(),
      //     reserveTime: guest.reserveTime ? new Date(guest.reserveTime) : "",
      //   };

      //   handleChange(newGuest);

      //   console.log("guest----", newGuest);

      //   setGuest(INITIAL_GUEST);
      //   if (props.toggleDrawer) props.toggleDrawer();
      // }}
      onSubmit={updateGuestList}
      onClick={() => {}}
    >
      <SpacedInput
        required
        type="text"
        htmlFor="name"
        label="name"
        value={guest.name}
        onChange={(e) => {
          setGuest({ ...guest, name: e.target.value });
        }}
        // css={spacing}
      />

      <SelectSlider
        label="party size"
        options={PARTY_ARRAY}
        value={guest.party}
        handleChange={(val) => {
          setGuest({ ...guest, party: val });
        }}
        css={spacing}
      />

      <SpacedInput
        required
        type="tel"
        htmlFor="phone number"
        label="phone number"
        value={guest.phone}
        onChange={(e) => {
          const newValue = e.target.value || "";
          const newChar = newValue[newValue.length - 1];

          let numOfDigits = 0;

          for (let i = 0; i < newValue.length; i++) {
            if (/\d/.test(newValue.charAt(i))) numOfDigits++;
          }

          if (
            (/\d/.test(newChar) ||
              newValue === "" ||
              newChar === "-" ||
              newChar === " ") &&
            numOfDigits <= 10
          ) {
            setGuest({ ...guest, phone: newValue });
          }
        }}
        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        additionalInfo="(ex: 123-456-7890)"
        // css={spacing}
      />

      <SpacedInput
        type="text"
        htmlFor="notes"
        label="notes"
        value={guest.notes}
        onChange={(e) => {
          setGuest({ ...guest, notes: e.target.value });
        }}
        // css={spacing}
        additionalInfo="(optional)"
      />

      <SpacedInput
        type="datetime-local"
        htmlFor="reservation time"
        label="reservation"
        value={guest.reserveTime}
        onChange={(e) => {
          setGuest({ ...guest, reserveTime: e.target.value });
        }}
        // css={spacing}
        additionalInfo="(ignore if waitlist)"
      />

      {guest.reserveTime && (
        <SelectSlider
          label="seating"
          options={TABLE_ARRAY}
          value={guest.table}
          handleChange={(val) => {
            setGuest({ ...guest, table: val });
          }}
          css={spacing}
        />
      )}

      <AddGuestButton text="confirm guest" />
    </AddGuestContainer>
  );
});

export default AddGuest;
