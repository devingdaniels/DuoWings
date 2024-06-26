import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { persistor } from "../../app/store";
import { VocabSliceService } from "../../features/vocabSlice";
import { clearUserAuthState } from "../../features/userAuthSlice";
import { logout, deleteAccount } from "../../features/userAuthSlice";
import Button from "@mui/material/Button";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(VocabSliceService.setVocabSliceToInitialState());
    dispatch(clearUserAuthState());
    dispatch(logout());
    // Purge local storage and wait for it to complete
    persistor.purge().then(() => {
      console.log("Logout successful");
      navigate("/");
    });
  };

  const handleDeleteAccount = async () => {
    // dispatch(VocabSliceService.purgeUserAndStoreData());
    // dispatch(clearUserAuthState());
    await dispatch(deleteAccount());
    console.log("Delete account logic to be implemented");

    // Purge local storage and wait for it to complete
    // persistor.purge().then(() => {
    //   console.log("Account deleted");
    //   navigate("/");
    // });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
      <Button variant="contained" onClick={handleDeleteAccount}>
        Delete account
      </Button>
    </>
  );
}

export default Logout;
