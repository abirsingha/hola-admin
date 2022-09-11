import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../../src/Components/UI/Card";
import AuthContext from "../Store/AuthContext";
import Logo from "../Assests/logo.png";

const SignupForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsTouch, setEmailIsTouch] = useState(false);
  const [passwordIsTouch, setPasswordIsTouch] = useState(false);

  const emailIsValid = email.trim() !== "" && email.includes("@");
  const emailIsInValid = !emailIsValid && emailIsTouch;
  const passwordIsValid = password.trim() !== "" && password.length >= 6;
  const passwordIsInValid = !passwordIsValid && passwordIsTouch;

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const toggleAuthHandler = () => { 
    setIsLogin((prevState) => !prevState);
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMessage('')
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [message]);

  const signupHandler = (event) => {
    event.preventDefault();
    setEmailIsTouch(true);
    setPasswordIsTouch(true);

    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAt9Z7e_sPZLqc0U-h4c20PRBXobKFlYs';
    }
    else { 
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAt9Z7e_sPZLqc0U-h4c20PRBXobKFlYs';
    }
    let userPassword;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      else{
        return res.json().then((data) => { 
        let errorMessage;
        if (data.error && data.error.message === 'EMAIL_EXISTS') { 
          errorMessage = 'Email already exist! Please login.';
          setIsLogin(true);
        }
        if (data.error && data.error.message === 'EMAIL_NOT_FOUND') { 
          errorMessage = 'Email does not exist. Please signup.';
          setIsLogin(false);
        }
        if (data.error && data.error.message === 'INVALID_PASSWORD') { 
          errorMessage = 'Invalid password. Please try again.';
      }
        throw new Error(errorMessage);
        })
      }
    }).then((data) => {
      const token = data.idToken;
      const userEmail = data.email;
      if (!isLogin) { 
        setMessage('Successfully signup! Please login');
        setIsLogin(true);
      }
      else if(isLogin) {
        setMessage('Successfully Login!');
        userPassword = password
        authCtx.login(token, userEmail, userPassword);
        navigate('/dashboard');
      }
      }).catch((err) => {
        if (err) { 
          setMessage(err.message);
        }
      })

    setEmail("");
    setPassword("");
    setEmailIsTouch(false);
    setPasswordIsTouch(false);
  };

  let customClass = message ? 'msg-cont visible' : 'msg-cont';

  return (
    <Card className="signup">
      <div className={customClass}>{message}</div>
      <form onSubmit={signupHandler}>
        <div className="logo d-flex justify-content-center mb-3">
          <img src={Logo} alt="Hola Admin" />
        </div>
        <h2 className="text-center">{isLogin ? "Login" : "Signup" }</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={emailHandler}
          />
          {emailIsInValid && (
            <span className="errorMsg">Please enter a valid email.</span>
          )}
        </div>
        <div className="form-group">
          <label className="mt-3">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={passwordHandler}
          />
          {passwordIsInValid && (
            <span className="errorMsg">Please enter a valid (more than 6 charecter) password.</span>
          )}
        </div>
        <button className="btn btn-default btn-signup">{isLogin ? "Login" : "Signup"}</button>
        <div className="text-center">
          <p className="toggletext mt-3" onClick={toggleAuthHandler}>{isLogin ? "Create new account" : "Login with email & password"}</p>
          </div>
      </form>
    </Card>
  );
};

export default SignupForm;
