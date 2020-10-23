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
  justify-content: center;
  align-items: center;

  @media (max-width: 1050px) {
    flex-direction: column;
  }
`;

const RegisterCard = styled(Card)`
  @media (max-width: 500px) {
    width: 90%;
    padding: 1rem;
    /* background-color: red; */
  }
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
  width: 40rem;
  height: 40rem;
  padding: 0.5rem;

  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-bottom: 4px solid ${({ theme }) => theme.colors.outline};
`;

const RegisterPage = () => {
  const [info, setInfo] = useState("");
  const [reserve, setReserve] = useState(false);
  const [seating, setSeating] = useState("");
  const { register, handleSubmit, errors, watch } = useForm();

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

  const onSubmit = (data) => {
    setInfo(data);
    console.log("lsjdflkj, data", data);
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        {/* noValidate disables the html5 validation and its ugly messages */}
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

            <SpacedInput
              type="number"
              htmlFor="party"
              label="party size"
              name="party"
              ref={register(partyReqs)}
              error={errors.party && errors.party.message}
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
                  name="reservation"
                  ref={register(reservationReqs)}
                  error={errors.reservation && errors.reservation.message}
                />

                <SelectSlider
                  label="table"
                  options={[
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "B2",
                    "ALT",
                    "F4",
                  ]}
                  handleChange={setSeating}
                  value={seating}
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
          <SeatPicker options={[]} handleChange={setSeating} value={seating} />
        </SeatPickerContainer>
      )}
    </RegisterContainer>
  );
};

export default RegisterPage;
