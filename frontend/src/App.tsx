import React, { useState, useEffect } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Adjust the type according to your API response
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8585/api"); // Adjust the URL as needed
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>API Data</h1>
      {loading ? <p>Loading...</p> : <h1>{data}</h1>}
    </div>
  );
};

export default App;
