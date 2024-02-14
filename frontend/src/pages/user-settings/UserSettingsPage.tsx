import Logout from "./Logout";

// DELETE THIS LATER:
import { useAppSelector } from "../../app/hooks";

function UserSettings() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Logout />
      <p>{user?._id}</p>
      <p>{user?.fname}</p>
      <p>{user?.lname}</p>
      <p>{user?.email}</p>
      <p>{user?.phonenumber}</p>
      <p>{user?.role}</p>
    </>
  );
}

export default UserSettings;
