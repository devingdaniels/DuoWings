import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";

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

const DropdownComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("recent"); // Set default option to "recent"

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Dropdown
      value={selectedOption}
      onChange={handleOptionChange}
      displayEmpty
      inputProps={{ "aria-label": "select option" }}
    >
      <MenuItem value="recent">Recent (Studied)</MenuItem>
      <MenuItem value="newest">Created (newest)</MenuItem>
      <MenuItem value="oldest">Created (oldest)</MenuItem>
    </Dropdown>
  );
};

export default DropdownComponent;
