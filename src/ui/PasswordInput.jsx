import { useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";
import styled from "styled-components";

const StyledPasswordInput = styled.div`
  position: relative;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  width: 100%;
`;

const Button = styled.button`
  color: var(--color-grey-600);
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;

  &:active,
  &:hover,
  &:focus {
    outline: none;
  }
`;

function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }
  return (
    <StyledPasswordInput>
      <Input type={showPassword ? "text" : "password"} {...props} />
      <Button type="button" onClick={handleShowPassword}>
        {showPassword ? <HiEye /> : <HiEyeOff />}
      </Button>
    </StyledPasswordInput>
  );
}

export default PasswordInput;
