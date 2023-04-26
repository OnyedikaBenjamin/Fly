import React from "react";
import "./createAccount.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  

  const navigate = useNavigate();
  const baseUrl =
    "https://ce99-102-88-62-64.ngrok-free.app/api/v1/passenger/register";

  const postRegData = {
      firstName,lastName, emailAddress, phoneNumber, password
  }

  const validateRegData = () => {
    const regex = /\d+/;
    if (regex.test(postRegData.lastName) || regex.test(postRegData.firstName)) {
      alert("Numbers are not allowed in firstname and lastname fields");
      return false;
    }
  for (let key in postRegData){
    if(postRegData[key] === ""){
      alert(`${key} cannot be empty`)
      return false
    }
  }
  }

  const postData = (e) => {
    e.preventDefault();

    const valResult = validateRegData()
    console.log(`logging val result ${valResult}`);
    if (valResult === false) return;
    Axios.post(baseUrl, {

      "firstName": firstName,
      "lastName":lastName,
      "emailAddress":emailAddress,
      "phoneNumber":phoneNumber,
      "password":password,

    })
      .then((res) => {
        alert(res.data["data"].message);
        // res.data.isSuccessful && navigate("/login");
        

        res.data.isSuccessful && navigate("/login", {state:{email:emailAddress}});
      })
      .catch((error) => {
       console.log(error);
      });
  };
  
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
  });
  const validateInput = (field, value) => {
    switch (field) {
      case " firstName":
        if (value.length === 0) {
          setErrors((errors) => ({
            ...errors,
            firstName: "First Name is required",
          }));
        } else {
          setErrors((errors) => ({ ...errors, firstName: "" }));
        }
        break;
      case "lastName":
        if (value.length === 0) {
          setErrors((errors) => ({
            ...errors,
            lastName: "Last Name is required",
          }));
        } else {
          setErrors((errors) => ({ ...errors, lastName: "" }));
        }
        break;
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
      case "phonenumber":
        if (value.length < 11) {
          setErrors((errors) => ({
            ...errors,
            phoneNumber: "Phonenumber is invalid",
          }));
        } else {
          setErrors((errors) => ({ ...errors, phoneNumber: "" }));
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
    <div className="signup">
      <div className="signup_text">
        <h3>CREATE ACCOUNT</h3>

        <form className="signup_form">
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateInput("firstName", e.target.value);
            }}
         
            placeholder="Firstname"
            required
          />
          <div className="email">{errors.firstName}</div>

          <input
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
              validateInput("lastName", e.target.value);
            }}
            placeholder="Lastname"
            required
          />
          <div className="email">{errors.lastName}</div>

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
          <div className="email">{errors.emailAddress}</div>

          <input
            type="number"
            value={phoneNumber}
            name="phone"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              validateInput("phoneNumber", e.target.value);
            }}
          
            placeholder="Phonenumber"
            required
          />
          <div className="email">{errors.phoneNumber}</div>

          <select id="selects">
            <option>Role</option>
            <option>Passenger</option>
            <option>Travel Agent</option>
          </select>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateInput("password", e.target.value);
            }}
            
            placeholder="Password"
            required
          />
          <div className="pass">{errors.password}</div>

          <button className="btn" onClick={postData}>
            Create Account
          </button>
          <p>
            Already have an account?
            <Link to="/login">
              {" "}
              <span>Login Here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
