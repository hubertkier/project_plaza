import { useState } from "react";
import CInput from "../../common/CInput/CInput";
import "./Register.css";
import checkE from "../../utils/errors";
import { RegisterMe } from "../../services/api-calls";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [registerErrors, setRegisterErrors] = useState("");

  const [credentialsErrors, setCredentialsErrors] = useState({
    nameError: "",
    emailError: "",
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

  const registerFunction = async () => {
    RegisterMe(credentials)
      .then((res) => {
        if (res.status === "Success") {
          navigate("/home");
        } else {
          setRegisterErrors(res.status);
        }
      })
      .catch((error) => {
        console.log(error);
        setRegisterErrors("An error occurred during registration.");
      });
  };

  return (
    <div className="register-body">
    <div className="register-design">
      <h2>Register</h2>
      <CInput
        type="text"
        name="name"
        placeholder="Username"
        design={`${
          credentialsErrors.nameError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.nameError && (
        <div className="error-message">{credentialsErrors.nameError}</div>
      )}
      <CInput
        type="email"
        name="email"
        placeholder="Email"
        design={`${
          credentialsErrors.emailError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.emailError && (
        <div className="error-message">{credentialsErrors.emailError}</div>
      )}
      <CInput
        type="password"
        name="password"
        placeholder="Password"
        design={`${
          credentialsErrors.passwordError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      <CInput
        type="password"
        name="confirmpassword"
        placeholder="Confirm Password"
        design={`${
          credentialsErrors.passwordError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.passwordError && (
        <div className="error-message">{credentialsErrors.passwordError}</div>
      )}
      {credentials.password !== "" &&
        credentials.password === credentials.confirmpassword &&
        credentialsErrors.nameError === "" &&
        credentialsErrors.passwordError === "" && (
          <div className="register-button" onClick={registerFunction}>
            Register
          </div>
        )}
      {registerErrors && <div className="error-message">{registerErrors}</div>}
    </div>
    </div>
  );
}

export default Register;
