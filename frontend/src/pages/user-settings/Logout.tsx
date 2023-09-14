import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/userAuthSlice";
// Material UI
import Button from "@mui/material/Button";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isSuccess && !user) {
      console.log("Logged out");
      navigate("/");
    }
    if (isError) {
      console.log("Error logging out");
      console.log(message);
    }
  }, [user, isError, isSuccess, message]);

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
