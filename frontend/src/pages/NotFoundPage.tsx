import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <Link to="/">
        <h1>404 Page Not Found</h1>
      </Link>
    </>
  );
};

export default NotFoundPage;
