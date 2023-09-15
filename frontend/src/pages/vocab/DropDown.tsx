import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Dropdown = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Use the primary color
  color: theme.palette.primary.contrastText, // Text color for contrast
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.85), // Slight opacity on hover
  },
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "auto",
  "& .MuiSelect-root": {
    color: "inherit",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const DropdownComponent = () => {
  const [selectedOption, setSelectedOption] = useState("recent"); // Set default option to "recent"

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // You can perform any actions or handle the selected option here
  };

  return (
    <Dropdown
      value={selectedOption}
      onChange={handleOptionChange}
      displayEmpty
      inputProps={{ "aria-label": "select option" }}
    >
      <MenuItem value="recent">Recent</MenuItem>
      <MenuItem value="newest">Created (newest)</MenuItem>
      <MenuItem value="oldest">Created (oldest)</MenuItem>
    </Dropdown>
  );
};

export default DropdownComponent;
