import React, { useState } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

import styled from "@emotion/styled";
import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";

import { ReactComponent as ReserveGraphic } from "../assets/illustrations/reservationPageLogo.svg";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";

import SelectSlider from "../components/inputs/SelectSlider";

import Select from "react-select";

const partySizeArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const options = [
  { value: "Yelpy", label: "Yelpy" },
  { value: "Musky Burgers", label: "Musky Burgers" },
  { value: "The Golden Nug", label: "The Golden Nug" },
  { value: "Burnt Tortilla", label: "Burnt Tortilla" },
  { value: "Toro Loco", label: "Toro Loco" },
  { value: "The Hat", label: "The Hat" },
];

const Nothing = styled.input`
  width: 10rem;
  background-color: lightgray;
  color: black;
  height: 2rem;
`;

const DropdownR = styled.div`
  height: 10rem;
  width: 10rem;
  background-color: lightblue;

  position: absolute;

  top: 2rem;
  left: 0;
  z-index: 0;
`;

const SearchbarContainer = styled.div`
  position: relative;
  z-index: 5;
  /* background-color: red;

  width: 10rem;
  height: 5rem; */
`;

const SearchBar = () => {
  const [searchValue, setSelectedOption] = useState("");

  const handleChange = (e) => {
    console.log("settings new value", e.target.value);
    setSelectedOption(e.target.value);

    // setSelectedOption();
    // code to make something happen after selecting an option
  };

  return (
    <SearchbarContainer>
      <Nothing onChange={handleChange} type="text" />
      {searchValue !== "" && (
        <DropdownR>
          {options
            .filter((item) => {
              console.log(item);
              return item.value.includes(searchValue);
            })

            .map((item, i) => (
              <div>
                {i + " "}
                {item.value}
              </div>
            ))}
        </DropdownR>
      )}
      {/* <AB /> */}
    </SearchbarContainer>
  );
};

// const MyComponent = () => <Select options={options} />;

//Style for the search
const StyledSearch = styled(Select)`
  width: 300px;
  padding: 20px;
  .select__menu-list::-webkit-scrollbar {
    width: 4px;
    height: 0px;
  }
  .select__menu-list::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .select__menu-list::-webkit-scrollbar-thumb {
    background: #888;
  }
  .select__menu-list::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const RContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

//To initial the values
const INITIAL = {
  /*S */
  name: "",
  phone: "",
  /*Party size*/
  date: "",
  /*table*/
};

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};

  width: 50%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  svg {
    width: 20 rem;
    height: 20rem;
  }

  box-shadow: 3px 5px 10px white;
`;

const RFormInput = styled(FormInput)`
  min-width: 80%;

  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3em;
  text-align: flex-start;
  flex-direction: row;
  color: palevioletred;
`;

const TitleInput = styled.h1`
  font-size: 2em;
  text-align: flex-start;
  flex-direction: row;
  color: palevioletred;
`;

const LabelAndInput = styled.div`
  width: 100%;
  height: 10%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  overflow: auto;
`;

const ReservationPage = () => {
  const history = useHistory();
  const [formValues, setFormValues] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [party, setPartySize] = useState("1");

  return (
    <RContainer>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          console.log("formvalues", formValues);
          setSubmitted(true);

          setFormValues(INITIAL);

          history.push("/reservation-confirmation");
        }}
      >
        <Title>Reservation</Title>

        <ReserveGraphic />

        <TitleInput>Restaurant Name</TitleInput>
        <SearchBar />

        <RFormInput
          required
          htmlFor="name"
          label="Your name"
          value={formValues.name}
          handleChange={(e) => {
            setFormValues({ ...formValues, name: e.target.value });
          }}
        />
        <RFormInput
          required
          htmlFor="phone"
          label="phone"
          value={formValues.phone}
          handleChange={(e) => {
            setFormValues({ ...formValues, phone: e.target.value });
          }}
          additionalInfo="(###-###-####)"
          maxLength={12}
        />

        <TitleInput>Party Size</TitleInput>

        <DropdownButton id="party-size-dropdown" title={party}>
          {partySizeArr.map((item, i) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  setPartySize(item);
                }}
              >
                {item}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>

        <RFormInput
          required
          htmlFor="date"
          label="date"
          value={formValues.date}
          handleChange={(e) => {
            setFormValues({ ...formValues, date: e.target.value });
          }}
          additionalInfo="(MM-DD-YYYY)"
          maxLength={10}
        />
        <SelectSlider 
          options= {["Table 1-A","Table 1-B","Table 1-C",
          "Table 2-A","Table 2-B","Table 2-C",
          "Table 3-A","Table 3-B","Table 3-C",
          "Table 4-A","Table 4-B","Table 4-C"]}
          label = "Slider"
          value={formValues.seating}
          handleChange={(e) => {
            setFormValues({ ...formValues, seating: e });
          }}
          ></SelectSlider>

        <Button type="submit" text="Confirm Reservation"></Button>
      
      </FormContainer>
    </RContainer>
  );
};
export default ReservationPage;
