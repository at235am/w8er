import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// icons:
import { MdError } from "react-icons/md";

const ErrorContainer = styled.div`
  border-radius: 3px;
  height: 3.5rem;
  width: 100%;
  background-color: ${({ theme }) => rgba(theme.colors.error, 0.3)};
  /* border: 2px solid ${({ theme }) => theme.colors.error}; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorIcon = styled(MdError)`
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  path {
    fill: ${({ theme }) => theme.colors.error};
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-weight: bold;
  flex: 1;

  display: flex;
  justify-content: center;
`;

const ErrorMessage = ({ text, ...props }) => {
  return (
    <ErrorContainer {...props}>
      <ErrorIcon />
      <ErrorText>{text}</ErrorText>
    </ErrorContainer>
  );
};

export default ErrorMessage;
