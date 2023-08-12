import React from "react";
import { useNavigate } from "react-router-dom";

interface AuthLandingHeaderProps {
  destination: string;
}

const AuthLandingHeader: React.FC<AuthLandingHeaderProps> = ({
  destination,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <h1
        className="auth-page-header duowings-site-title"
        onClick={() => navigate(destination)}
      >
        DuoWings
      </h1>
    </>
  );
};

export default AuthLandingHeader;
