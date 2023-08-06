import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: "2rem" }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={120}
    />
  );
};

export default DarkModeToggle;
