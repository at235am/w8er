import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {ReactComponent as QueueGraphic} from "../assets/illustrations/queue.svg";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import Button from "../components/buttons/Button";
import FormInput from "../components/inputs/FormInput";

// icons:
import { MdAdd } from "react-icons/md";
import GuestList from "../components/GuestList";

const spacing = css`
  margin-bottom: 1rem;
`;

const WaitlistContainer = styled.div`
  width: 100%;
  height: 100%;
  //background-color: black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;
/*
const ContainerContainer = styled.div`
  background-color: pink;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
*/
const FormContainer = styled.form`
  width: 50%;
  height: 80%;
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;


  svg {
    width: 20 rem;
    height: 20rem;
  }

  padding: 2rem 3rem;
  border: 2px white;
  box-shadow: 3px 5px 10px white;
  
`;
const AddButton = styled(Button)`
  background-color: red;
  width: 50%;
  color: yellow;
`;


const InputStuff = styled(FormInput)`
  width: 100%;
  input {
    // color ${({ theme }) => theme.colors.onBackground};
    // input-color: blue;
    // background-color: ${({ theme }) => theme.colors.onBackground};
  }
  
`;

const Heading = styled.p`
  font-family: Arial, "Times New Roman";
  font-weight: 100;
  text-transform: capitalize;  

  font-size: 2rem;
  color: ${({ theme }) => theme.colors.onBackground};
`;

const inputStyles = (theme) => css`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  input {
    // background-color: $theme.colors.onSurf{ace};

    
  }
`;

const buttonStyles = (theme) => css`
  ${inputStyles(theme)}
  width: 100%;

  .btn-icon {
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

const GUEST_VALUES = {
  name: "", // easy (completed)
  size: "", // hard (completed)
  phone: "", // hard
  notes: "", // text area easy
  reserve: "", // time that the guest reserves (use this variable to check if waitlist or reservation)
};

const Waitlist = React.forwardRef(({ handleChange, ...props }, ref) => {
  const [guest, setGuest] = useState(GUEST_VALUES);
  const history = useHistory();

  return (
    <WaitlistContainer>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          console.log("guest", guest);
          setGuest(GUEST_VALUES);
          history.push("/confirmation");
        }}
        style={{borderRadius:  20}}
      >
        <Heading>waitlist</Heading>
        <QueueGraphic/>
        <Heading>please fill to be wailisted</Heading>
        <InputStuff
        required
        type="text"
        htmlFor="name"
        label="name"
        value={guest.name}
        handleChange={(e) => {
          setGuest({ ...guest, name: e.target.value });
        }}
        css={spacing}
      />
      <InputStuff
        required
        type="text"
        htmlFor="size"
        label="size"
        value={guest.size}
        handleChange={(e) => {
          setGuest({ ...guest, size: e.target.value });
        }}
        css={spacing}
      />
      <InputStuff
        required
        type="text"
        htmlFor="phone"
        label="phone"
        value={guest.phone}
        handleChange={(e) => {
          setGuest({ ...guest, phone: e.target.value });
        }}
        additionalInfo="(10 Numbers)"
        maxLength={10}
        css={spacing}
      />
      <InputStuff
        required
        type="text"
        htmlFor="notes"
        label="notes"
        value={guest.notes}
        handleChange={(e) => {
          setGuest({ ...guest, notes: e.target.value });
        }}
        css={spacing}
      />
      <InputStuff
        required
        type="text"
        htmlFor="reserve"
        label="reserve date"
        value={guest.reserve}
        handleChange={(e) => {
          setGuest({ ...guest, reserve: e.target.value });
        }}
        //pattern="[01-12]{2}/[01-31]{2}/[2020-2021]{4}"
        additionalInfo="(mon/day/year) 01/23/2020"
        css={spacing}
      />
      <AddButton text="confirm guest"></AddButton>

      </FormContainer>
      

      
    </WaitlistContainer>
  );
});

export default Waitlist;
