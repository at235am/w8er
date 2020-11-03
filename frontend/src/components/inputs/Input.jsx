import React, { useState, useEffect, useRef } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputWrapper = styled.div`
  width: 100%;
  position: relative;

  border-radius: 3px;

  overflow: hidden;
  /* box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15); */

  display: flex;
  flex-direction: column;

  max-height: 3.5rem;
  min-height: 3.5rem;
  height: 3.5rem;
  /* cursor: text; */

  background-color: ${({ theme }) => theme.colors.background};

  input[type="datetime-local"] {
    color: ${({ theme, value }) =>
      value ? theme.colors.onBackground : theme.colors.background};

    &:focus-within,
    &:focus {
      color: ${({ theme }) => theme.colors.onBackground};
    }
  }
`;

const initialPos = css`
  top: 13px;
  left: 1.5rem;
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
  font-weight: normal;
`;

const finalPos = css`
  top: 5px;
  left: 10px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Label = styled.label`
  position: absolute;
  text-transform: uppercase;
  white-space: nowrap;

  ${({ focused, value }) => (focused || value ? finalPos : initialPos)}
  color: ${({ theme }) => theme.colors.onBackground};
  /* background-color: ${({ theme }) => theme.colors.onBackground}; */

  transition-property: top, left, font-weight, font-size;
  transition-duration: 100ms;
  transition-timing-function: linear;
`;

const ErrorMsg = styled.p`
  /* width: 100%; */
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  position: absolute;
  top: 5px;
  right: 10px;
  /* flex: 1; */
  /* background-color: red; */

  color: ${({ theme }) => theme.colors.error};

  display: flex;
  justify-content: flex-end;
`;

const InputField = styled.input`
  width: 100%;
  /* height: 2.3rem;
  min-height: 2.3rem;
  max-height: 2.3rem; */
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  letter-spacing: 1px;

  color: ${({ theme }) => theme.colors.onBackground};
  background-color: transparent;
  padding: 0 0.75rem;
  padding-top: 1.2rem;
`;

const VisibilityContainer = styled.div`
  cursor: pointer;

  /* height: 100%; */
  /* background-color: red; */

  /* margin-right: 0.5rem; */

  position: absolute;
  bottom: 5px;
  right: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    /* background-color: red; */
    height: 1.5rem;
    width: 1.5rem;

    path {
      fill: #373e4d;
    }
  }

  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-weight: bold;
  font-size: inherit;
`;

const Input = React.forwardRef(
  ({ className, error, label, htmlFor, type, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputRef = useRef({ current: { value: "" } });

    const determineInputType = () => {
      if (type === "password" && passwordVisible === true) return "text";
      else if (type === "password") return "password";
      else return type;
    };

    return (
      <InputWrapper className={className} value={inputRef.current.value}>
        {label && (
          <Label
            htmlFor={htmlFor}
            focused={focused}
            value={inputRef.current.value}
          >
            {label}
            {props.required && <Required>*</Required>}
          </Label>
        )}
        <ErrorMsg>{error}</ErrorMsg>

        <InputField
          {...props}
          type={determineInputType(type)}
          id={htmlFor}
          ref={(e) => {
            if (ref) ref(e);
            inputRef.current = e;
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
        />

        {(type === "password" && focused) ||
        (type === "password" && inputRef.current.value) ? (
          <VisibilityContainer
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
          </VisibilityContainer>
        ) : null}
      </InputWrapper>
    );
  }
);

export default Input;
