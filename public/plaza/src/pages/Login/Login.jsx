import { useContext, useState, useEffect } from "react";
import { myContext } from "../../app/context";
import CInput from "../../common/CInput/CInput";
import "./Login.css";
import checkE from "../../utils/errors";
import { LoginMe } from "../../services/api-calls";
import { useNavigate } from "react-router-dom";

function Login() {

  //Instance of the context

  const {state, SetAuth} = useContext(myContext)
  const navigate = useNavigate("");

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

  const loginFunction = async () => {

    LoginMe(credentials)
        .then(res => {
          if(res.status == "Success"){
            SetAuth("token", res.api_token)


            navigate("/home")
          }
          else{
            console.log(res.status)
            setLoginErrors(res.status)
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
        placeholder=""
        design={`${
          credentialsErrors.nameError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      { loginErrors }
      {credentialsErrors.nameError}
      <CInput
        type="password"
        name="password"
        placeholder=""
        design={`${
          credentialsErrors.passwordError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.passwordError}
      {credentials.name !== "" &&
        credentials.password !== "" &&
        credentialsErrors.nameError === "" &&
        credentialsErrors.passwordError === "" && (
          <div className="login-button-design" onClick={loginFunction}>
            Login me!
          </div>
        )}
      
    </div>
  );
}

export default Login;
