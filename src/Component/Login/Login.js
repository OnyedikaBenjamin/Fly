import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { LoggedContext } from "../../App";
import { useContext } from "react";
import Axios from "axios";

function LogIn() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

      
  
  const { checkUser, setCheckUser } = useContext(LoggedContext);
  
  const navigate = useNavigate();

  const baseUrl =
    "https://ce99-102-88-62-64.ngrok-free.app/api/v1/passenger/login";

    const postRegData = {
      emailAddress,
      password,
    };


   const validateRegData = () => {

     for (let key in postRegData) {
       if (postRegData[key] === "") {
         alert(`${key} cannot be empty`);
         return false;
       }
     }
   };


  const postLoginData = (e) => {
    e.preventDefault();

   const valResult = validateRegData();
   console.log(`logging val result ${valResult}`);
   if (valResult === false) return;

   console.log("hitting server");
    Axios.post(baseUrl, {
      emailAddress,
      password,
    })
      .then((res) => {
        console.log(res.data["data"].message);

        if (res.data["data"].statusCode !== "OK") {
          alert(res.data["data"].message);
        }else{
          alert(res.data["data"].message);
          setCheckUser(res.data["data"].loggedIn);
          res.data.isSuccessful && navigate("/");
        }

      })
      .catch((error) => {
      alert(error.message);
      });
    // setEmailAddress("");
    // setPassword("");
  };
  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "emailAddress":
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          setErrors((errors) => ({
            ...errors,
            emailAddress: "Email Address is invalid",
          }));
        } else {
          setErrors((errors) => ({ ...errors, emailAddress: "" }));
        }
        break;

      case "password":
        if (value.length < 8) {
          setErrors((errors) => ({
            ...errors,
            password: "Password must be at least 8 characters",
          }));
        } else {
          setErrors((errors) => ({ ...errors, password: "" }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="login">
      <div className="login_text">
        <h3>Login to make your reservations</h3>

        <form className="login_form">
          <input
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
              validateInput("emailAddress", e.target.value);
            }}
            placeholder="EmailAddress"
            required
          />
           <div className="emails">{errors.emailAddress}</div>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateInput("password", e.target.value);
            }}
            placeholder="Password"
            name="password"
            required
          />
          <div className="pass">{errors.password}</div>

          {/* <div className="pword">
            <Link to="/forgot">
              <span>Forgot Password?</span>
            </Link>
          </div> */}
          <button className="bt" onClick={postLoginData}>
            Log In
          </button>
          <p>
            Need an account?
            <span>
              <Link to="/createAccount">
                <span>Create Account</span>
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
