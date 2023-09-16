import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  // Component state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allDecks, setAllDecks] = useState([]);
  const apiUrl = "http://localhost:8585/api/decks"; // Update with your actual API endpoint

  useEffect(() => {
    // Fetch all user decks when the component loads
    const fetchAllDecks = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAllDecks(data);
      } catch (error) {
        console.error("Error fetching all decks:", error);
      }
    };

    fetchAllDecks();
  }, [apiUrl]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Filter decks based on the search query
    const filteredDecks = allDecks.filter((deck) =>
      deck.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredDecks);
  }, [searchQuery, allDecks]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Filter..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchInputChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
