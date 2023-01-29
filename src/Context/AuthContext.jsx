import { createContext, useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [usererror, setUserError] = useState("");
  const [adminerror, setAdminError] = useState("");

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [admin, setAdmin] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let loginUser = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },

      body: JSON.stringify({
        email: e.email,
        password: e.password,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/home");
    } else {
      setUserError("invalid Email or Password");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  let loginAdmin = async (e) => {

    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },

      body: JSON.stringify({
        email: e.email,
        password: e.password,
      }),
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setAuthTokens(data);
      setAdmin(jwt_decode(data.access));
      localStorage.setItem("authTokensAdmin", JSON.stringify(data));
      navigate("/admin");
    } else {
      setAdminError("invalid Email or Password");
    }
  };
  let logoutAdmin = () => {
    setAuthTokens(null);
    setAdmin(null);
    localStorage.removeItem("authTokensAdmin");
    navigate("/admin_login");
  };

  let contextData = {
    user: user,
    admin: admin,
    usererror: usererror,
    adminerror: adminerror,
    loginUser: loginUser,
    logoutUser: logoutUser,
    loginAdmin: loginAdmin,
    logoutAdmin: logoutAdmin,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
