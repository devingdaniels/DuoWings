import { Link } from "react-router-dom";
import SideEye from "../../assets/sideEye.png";

const NotFoundPage = () => {
  return (
    <>
      <div className="not-found-page-container">
        <Link to="/">
          <img src={SideEye} alt="Side Eye" />
          <p>Nice try you sneaky sneaky</p>
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
