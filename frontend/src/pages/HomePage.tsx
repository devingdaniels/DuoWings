import axios from "axios";
import NavigationBar from "../components/homepage/NavigationBar";
import { useState, useEffect } from "react";

const HomePage: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_API_WORDS || "undefined";

  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getWords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL + "/words");
      setWords(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <>
      <NavigationBar />

      {loading ? (
        <>Loading...</>
      ) : (
        <ul>
          {words.map((word, ind) => (
            <li key={ind}>{word}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HomePage;
