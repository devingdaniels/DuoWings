import { PropagateLoader } from "react-spinners";

const laodingContainer = {
  margin: "10% auto",
};

function Spinner() {
  return (
    <div style={laodingContainer}>
      <PropagateLoader color="#36d7b7" />
    </div>
  );
}

export default Spinner;
