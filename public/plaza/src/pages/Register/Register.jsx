import { useContext, useState, useEffect } from "react";
import { myContext } from "../../app/context";
import CInput from "../../common/CInput/CInput";
import "./Register.css";
import checkE from "../../utils/errors";
import { RegisterMe } from "../../services/api-calls";
import { useNavigate } from "react-router-dom";

function Register() {

  //Instance of the context

  const navigate = useNavigate("");

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerErrors, setRegisterErrors] = useState("");


  const [credentialsErrors, setCredentialsErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    
  });

  const inputHandler = (e) => {
    //Binding process
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      //email : maciej@gmail.com
    }));
  };

  const errorCheck = (e) => {
    let error = "";

    error = checkE(e.target.name, e.target.value);

    setCredentialsErrors((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const registerFunction = async () => {

    RegisterMe(credentials)
        .then(res => {
          if(res.status == "Success"){
            navigate("/home")
          }
          else{
            console.log(res.status)
            setRegisterErrors(res.status)
          }
          
        })
        .catch(error => console.log(error))
  
  };

  // useEffect(()=>{

  //     console.log(credentials)

  // }, [credentials])

  return (
    <div className="login-design">
      <CInput
        type="text"
        name="name"
        placeholder="username"
        design={`${
          credentialsErrors.nameError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.nameError}
      <CInput
        type="email"
        name="email"
        placeholder="email"
        design={`${
          credentialsErrors.emailError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      <CInput
        type="password"
        name="password"
        placeholder="password"
        design={`${
          credentialsErrors.passwordError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      <CInput
        type="password"
        name="confirmpassword"
        placeholder="confirm password"
        design={`${
          credentialsErrors.passwordError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      
      {credentialsErrors.passwordError}
      {credentials.name !== "" &&
        credentials.password !== "" &&
        credentials.password === credentials.confirmpassword &&
        credentialsErrors.nameError === "" &&
        credentialsErrors.passwordError === "" && (
          <div className="login-button-design" onClick={registerFunction}>
            Register me!
          </div>
        )}
        { registerErrors }

    </div>
  );
}

export default Register;
