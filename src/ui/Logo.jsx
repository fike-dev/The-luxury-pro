import styled from "styled-components";
import { useDarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.5rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkModeContext();

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo as={Link} to="/dashboard">
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
