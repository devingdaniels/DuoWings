import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

// Material UI
import Button from "@mui/material/Button";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    console.log("Logout to be implemented...");
    if (!user) {
      navigate("/");
    }
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
