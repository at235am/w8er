import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  /* margin: 2rem; */
  padding: 2rem;

  width: 30rem;
  /* height: 40rem; */

  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-bottom: 4px solid ${({ theme }) => theme.colors.outline};
  /* border-right: 4px solid ${({ theme }) => theme.colors.outline}; */

  transition-property: width, height, border-bottom, border-right;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  /* cursor: pointer; */

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */

  &:hover {
    /* border: 1px solid ${({ theme }) => theme.colors.primary}; */
    border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
    /* border-right: 4px solid ${({ theme }) => theme.colors.primary}; */
  }

  svg {
    width: 70%;
    height: 50%;
  }

  @media (max-width: 500px) {
    width: 90%;
    padding: 1rem;
    /* background-color: red; */
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.onBackground};
  font-size: 2rem;
  font-weight: bold;

  margin-bottom: 1rem;
  width: 100%;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.onBackground};

  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  width: 100%;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: inherit;
  font-style: italic;
`;

const Card = ({ children, ...props }) => {
  return <CardContainer {...props}>{children}</CardContainer>;
};

export default Card;
