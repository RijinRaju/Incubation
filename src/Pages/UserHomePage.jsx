import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHome from "../Components/UserHome/UserHome";

function UserHomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("authTokens") ? navigate("/home") : navigate("/");
  }, []);
  return (
    <div>
      <UserHome />
    </div>
  );
}

export default UserHomePage;
