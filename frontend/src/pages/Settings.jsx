import React from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import ReactTooltip from "react-tooltip";

const SettingsContainer = styled.div`
  margin-top: ${({ theme }) => theme.dimensions.navSize};
`;

const Settings = () => {
  return (
    <SettingsContainer>
      <p data-tip="hello world">julie</p>
      <ReactTooltip effect="float" />
    </SettingsContainer>
  );
};

export default Settings;
