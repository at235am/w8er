import React from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import Spinner from "../Spinner";

const btnSize = "2.5rem";

const textIconSeparator = (props) => css`
  margin-right: 0.5rem;
  ${console.log("propssss", props)}
`;

const circleBtn = css`
  border-radius: 5rem;
  width: ${btnSize};

  .btn-text,
  .btn-icon {
    width: 100%;
  }
`;

const regularBtn = css`
  border-radius: 4px;
  padding: 0 0.75rem;
`;

const ButtonContainer = styled.button`
  position: relative;
  /* padding: 0 0.75rem; */
  height: ${btnSize};
  /* border-radius: 4px; */
  background-color: ${(props) => props.theme.colors.primary};

  display: flex;
  /* flex-direction: column; */
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  justify-content: center;
  align-items: center;

  .btn-text {
    height: 100%;
    /* background-color: #fff; */

    font-weight: bold;
    text-transform: capitalize;
    font-style: italic;
    letter-spacing: 0px;
    white-space: nowrap;
    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .btn-icon {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      /* background-color: #fff; */
      width: 1rem;
      height: 1rem;

      path {
        fill: ${(props) => props.theme.colors.onPrimary};
      }
    }
  }

  .btn-spinner {
    position: absolute;
    right: 0;
    margin-right: 0.75rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  :disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.background};
    .btn-text {
      color: ${({ theme }) => theme.colors.onBackground};
    }
  }
`;

const Button = React.forwardRef(
  ({ type, text, icon, reverse, spinner, ...props }, ref) => {
    return (
      <ButtonContainer
        ref={ref}
        {...props}
        reverse={reverse}
        css={type === "circle" ? circleBtn : regularBtn}
      >
        {text ? (
          <span
            className="btn-text"
            css={
              icon && text
                ? css`
                    margin: ${reverse ? "0 0 0 0.5rem" : "0 0.5rem 0 0"};
                  `
                : null
            }
          >
            {text}
          </span>
        ) : null}
        {icon ? (
          <span className="btn-icon">{React.createElement(icon)}</span>
        ) : null}
        {spinner && (
          <span className="btn-spinner">
            {" "}
            <Spinner />
          </span>
        )}
      </ButtonContainer>
    );
  }
);

export default Button;
