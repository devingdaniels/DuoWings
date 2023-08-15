// Components
import { useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";

const HomePage: React.FC = () => {
  const testAuth = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_API_AUTH}/protected`;
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    testAuth();
  });

  return (
    <>
      <NavigationBar />
      Homepage
    </>
  );
};

export default HomePage;
