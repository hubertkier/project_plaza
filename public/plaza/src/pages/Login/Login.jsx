import { useContext, useState } from "react";
import { myContext } from "../../app/context";
import CInput from "../../common/CInput/CInput";
import "./Login.css";
import checkE from "../../utils/errors";
import { LoginMe } from "../../services/api-calls";
import { useNavigate } from "react-router-dom";

function Login() {
  const { state, SetAuth } = useContext(myContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState("");

  const [credentialsErrors, setCredentialsErrors] = useState({
    nameError: "",
    passwordError: "",
  });

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = checkE(e.target.name, e.target.value);
    setCredentialsErrors((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const loginFunction = async () => {
    try {
      const res = await LoginMe(credentials);
      if (res.status === "Success") {
        SetAuth("token", res.api_token);
        navigate("/home");
      } else {
        setLoginErrors(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
    <div className="login-design">
      <h2 className="login-title">Login</h2>
      <CInput
        type="text"
        name="name"
        placeholder="Username"
        design={`${
          credentialsErrors.nameError ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.nameError && (
        <div className="error-message">{credentialsErrors.nameError}</div>
      )}
      <CInput
        type="password"
        name="password"
        placeholder="Password"
        design={`${
          credentialsErrors.passwordError ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.passwordError && (
        <div className="error-message">{credentialsErrors.passwordError}</div>
      )}
      {loginErrors && <div className="login-error">{loginErrors}</div>}
      {credentials.name &&
        credentials.password &&
        !credentialsErrors.nameError &&
        !credentialsErrors.passwordError && (
          <div className="login-button-design" onClick={loginFunction}>
            Login me!
          </div>
        )}
    </div>
    </div>
  );
}

export default Login;
