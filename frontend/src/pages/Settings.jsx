import React from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SettingsContainer = styled.div`
  margin-top: ${({ theme }) => theme.dimensions.navSize};
`;

const Settings = () => {
  return <SettingsContainer></SettingsContainer>;
};

export default Settings;
