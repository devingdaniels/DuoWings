import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <Link to="/">
        <h1>404 Page Not Found, click to return to DuoWings</h1>
        <p>Under construction</p>
      </Link>
    </>
  );
};

export default NotFoundPage;
