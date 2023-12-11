import { useNavigate } from "react-router-dom";
// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { persistor } from "../../app/store";
import { VocabSliceService } from "../../features/vocabSlice";
import { clearUserAuthState } from "../../features/userAuthSlice";
import { logout } from "../../features/userAuthSlice";

// Material UI
import Button from "@mui/material/Button";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(VocabSliceService.clearUserDeckState());
    dispatch(clearUserAuthState());
    dispatch(logout());
    // Purge local storage and wait for it to complete
    persistor.purge().then(() => {
      console.log("Logout successful");
      navigate("/");
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </>
    );
  }
}

export default Logout;
