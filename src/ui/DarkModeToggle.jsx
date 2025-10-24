import { HiOutlineMoon } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon";
import { useDarkModeContext } from "../context/DarkModeContext";
import { HiOutlineSun } from "react-icons/hi";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <ButtonIcon
      onClick={toggleDarkMode}
      title={isDarkMode ? "light mode" : "dark mode"}
    >
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
