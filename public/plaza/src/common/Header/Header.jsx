import Surfer from "../Surfer/Surfer";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../../app/context";
import { jwtDecode } from "jwt-decode"; // Fixed the import
import esmovia from "../../assets/esmovia.jpg";

function Header() {
  const { state, SetAuth } = useContext(myContext);
  const [decodedName, setDecodedName] = useState("");

  useEffect(() => {
    if (state.auth.token !== "") {
      let decoded = jwtDecode(state.auth.token);
      setDecodedName(decoded?.firstName);
    }
  }, [state]);

  const navigate = useNavigate();
  return (
    <div className="header-design">
      <div className="logo-container" onClick={() => navigate("/")}>
        <img className="logo-design" src={esmovia} alt="Logo" />
      </div>
      <div className="nav-links">
        <Surfer path={"/"} destiny={"Home"} />
        {state.auth.token === "" ? (
          <>
            <Surfer path={"/login"} destiny={"Login"} />
            <Surfer path={"/register"} destiny={"Register"} />
          </>
        ) : (
          <>
            <Surfer path={"/profile"} destiny={decodedName} />
            <div className="logout" onClick={() => SetAuth("token", "")}>
              <Surfer path={"/"} destiny={"Log out"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
