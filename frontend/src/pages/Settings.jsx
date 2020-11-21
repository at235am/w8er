import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";

// icons:
import { MdEdit, MdInfoOutline } from "react-icons/md";
import { useRecoilState } from "recoil";
import { themeState } from "../recoil/ThemeState";
import { sidebarNav } from "../recoil/SidebarNav";
import ToggleButton from "../components/buttons/ToggleButton";

const SettingsContainer = styled.div`
  margin-top: ${({ theme }) => theme.dimensions.navSize};
  width: 100%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const SettingsWrapper = styled.div`
  width: 90%;
  padding: 1rem;
  min-height: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
`;

const CurrentInfo = styled.div`
  /* background-color: ${({ theme }) => theme.colors.background}; */

  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  /* margin-right: 1rem; */
  /* border-right: 1px solid ${({ theme }) => theme.colors.outline}; */
`;

const Table = styled.table`
  td {
    padding: 0.5rem;
  }

  td:nth-of-type(2n + 1) {
    background-color: ${({ theme }) => theme.colors.outline};
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    text-transform: capitalize;
  }
  td:nth-of-type(2n) {
    background-color: ${({ theme }) => theme.colors.background};
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    /* text-transform: capitalize; */
  }
`;

const Header = styled.h2`
  font-size: 1.25rem;

  /* color: ${({ theme }) => theme.colors.primary}; */

  margin-bottom: 1rem;

  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    height: 1.65rem;
    width: 1.65rem;
    path {
      fill: ${({ theme }) => theme.colors.onBackground};
    }
  }
`;

const FieldContainer = styled.div`
  height: 3.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: 1rem;
  border-radius: 3px;
  padding: 0 0.75rem;

  display: flex;
  align-items: center;
`;
const Divider = styled.div`
  height: 100%;
  width: 1px;
  margin: 0 1rem;
  background-color: ${({ theme }) => theme.colors.outline};
`;

const CurrentInfoMessage = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  /* background-color: ${({ theme }) => theme.colors.surface}; */

  /* color: ${({ theme }) => theme.colors.outline}; */
  /* font-weight: bold; */

  /* border: 1px solid ${({ theme }) => theme.colors.outline}; */
  border-radius: 3px;
  margin-bottom: 1rem;
`;

const CopyMessage = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => rgba(theme.colors.primary, 0.1)};
  /* background-color: ${({ theme }) => theme.colors.surface}; */

  p {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }

  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  /* margin-top: 1rem; */
  margin-bottom: 1rem;
`;

const FirstSetUp = styled.div`
  /* height: 10rem; */

  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => rgba(theme.colors.correct, 0.1)};
  /* background-color: ${({ theme }) => theme.colors.surface}; */
  color: ${({ theme }) => theme.colors.correct};
  font-weight: bold;

  border: 1px solid ${({ theme }) => theme.colors.correct};

  border-radius: 3px;

  margin-bottom: 1rem;
`;

const FormContainer = styled.form`
  /* width: 100%; */
  height: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;

const Label = styled.p`
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 0.9rem;
  font-weight: bold;

  margin-right: 1rem;
`;

const SpacedInput = styled(Input)`
  margin-bottom: 1rem;
  /* width: 25rem; */
`;

const ButtonInput = styled(Input)`
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: copy;

  label,
  input {
    color: white;
    cursor: copy;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  min-height: 3.5rem;
  height: 3.5rem;
  max-height: 3.5rem;
  /* margin-top: 1rem; */
`;

const LinkCopyButton = styled(Button)`
  .btn-text {
    text-transform: none;
  }
`;

const INITIAL_RES = {
  restaurantName: "",
  phoneNumber: "",
  address: "",
  uid: "",
  maxPartySize: "",
  minMode: "",
  theme: "",
};

const Settings = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [minMode, setMinMode] = useRecoilState(sidebarNav);
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState(INITIAL_RES);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useAuth();

  const resRef = db.doc(`restaurants/${currentUser.uid}`);

  const getRestaurant = () => {
    setLoading(true);
    resRef.onSnapshot((qs) => {
      // console.log("id", qs.id);
      // console.log("qs", qs.data());
      setRestaurant({
        ...restaurant,
        ...qs.data(),
        theme: theme,
        minMode: minMode,
        uid: currentUser.uid,
      });
      // setCurrentInfo({ ...currentInfo, ...qs.data(), uid: currentUser.uid });
      setLoading(false);
    });
  };
  const copyToClipboard = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(`w8r.in/r/${restaurant.uid}`);
    setCopied(true);
  };

  useEffect(() => {
    getRestaurant();
  }, []);
  // const ref = db.doc();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const snapShot = await resRef.get();

    if (snapShot.exists) {
      try {
        setLoading(true);
        await resRef.set({
          ...restaurant,
          theme: theme,
          minMode: minMode,
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log("error creating res", e);
      }
    }
    // resRef.set(restaurant);
  };
  return (
    <SettingsContainer>
      <SettingsWrapper>
        {/* <CurrentInfo>
          <Header>
            <MdInfoOutline />
            Current Information
          </Header>
          <CurrentInfoMessage>
            The following information will be used to help your customers
            identify your restaurant.
          </CurrentInfoMessage>
          <Table>
            <tbody>
              <tr>
                <td>restaurant name</td>
                <td>{currentInfo.restaurantName}</td>
              </tr>
              <tr>
                <td>address</td>
                <td>{currentInfo.address}</td>
              </tr>
              <tr>
                <td>phone number</td>
                <td>{currentInfo.phoneNumber}</td>
              </tr>
              <tr>
                <td>max party size</td>
                <td>{currentInfo.maxPartySize}</td>
              </tr>
              <tr>
                <td>share link: </td>
                <td>
                  <LinkCopyButton
                    onClick={copyToClipboard}
                    text={`w8r.in/r/${currentInfo.uid}`}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          {copied && (
            <CopyMessage>
              <p>Copied to clipboard!</p>
              <p>
                This link is what your customers will use to waitlist or
                reserve. Advertise this link on your website, yelp, etc.
              </p>
            </CopyMessage>
          )}
        </CurrentInfo>
        <Divider /> */}
        <FormContainer onSubmit={handleSubmit} noValidate>
          <Header>
            <MdEdit />
            Update Information
          </Header>
          {!restaurant.restaurantName && (
            <FirstSetUp>
              We noticed you have just signed up for our services! We recommend
              you fill in the below information to help your customers find your
              restaurant!
            </FirstSetUp>
          )}
          {copied && (
            <CopyMessage>
              <p>Copied to clipboard!</p>
              <p>
                This link is what your customers will use to waitlist or
                reserve. Advertise this link on your website, yelp, etc.
              </p>
            </CopyMessage>
          )}
          <CurrentInfoMessage>
            The following information will be used to help your customers
            identify your restaurant.
          </CurrentInfoMessage>
          <SpacedInput
            type="text"
            htmlFor="restaurant"
            label="restaurant name"
            // ref={register(resNameReqs)}
            // error={errors.restaurant && errors.restaurant.message}
            value={restaurant.restaurantName}
            onChange={(e) =>
              setRestaurant({ ...restaurant, restaurantName: e.target.value })
            }
          />
          <SpacedInput
            type="text"
            htmlFor="address"
            label="address"
            value={restaurant.address}
            onChange={(e) =>
              setRestaurant({ ...restaurant, address: e.target.value })
            }
          />
          <SpacedInput
            type="tel"
            htmlFor="phoneNumber"
            label="phone number"
            value={restaurant.phoneNumber}
            onChange={(e) =>
              setRestaurant({ ...restaurant, phoneNumber: e.target.value })
            }
          />
          <SpacedInput
            type="number"
            htmlFor="maxPartySize"
            label="Max party size"
            value={restaurant.maxPartySize}
            onChange={(e) =>
              setRestaurant({ ...restaurant, maxPartySize: e.target.value })
            }
            min="1"
          />
          <ButtonInput
            type="text"
            htmlFor="shareLink"
            label="Share link"
            value={`w8r.in/r/${restaurant.uid}`}
            onClick={copyToClipboard}
            disabled
          />

          <FieldContainer>
            <Label>Theme: {theme}</Label>
            <ToggleButton
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              value={theme === "dark" ? true : false}
            />
          </FieldContainer>

          <FieldContainer>
            <Label>Min Mode: {minMode ? "on" : "off"}</Label>
            <ToggleButton
              type="button"
              onClick={() => setMinMode(!minMode)}
              value={minMode}
            />
          </FieldContainer>

          {/* <ButtonContainer> */}
          {/* <RegisterButton
              text="skip for demo"
              onClick={(e) => {
                e.preventDefault();
                setUser({ sdljt: "" });
              }}
            /> */}
          {/* {authError && <ErrorMessage text={authError} />} */}
          <SubmitButton
            type="submit"
            text="Update Info"
            disabled={loading}
            spinner={loading}
          />
          {/* </ButtonContainer> */}
        </FormContainer>
      </SettingsWrapper>
    </SettingsContainer>
  );
};

export default Settings;
