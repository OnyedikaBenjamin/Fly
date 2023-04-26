import React, { useState } from "react";
import "./Forget.css";
import Axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState([]);
  

  const baseUrl = "https://jsonplaceholder.typicode.com/posts";

  const send = (e) => {
    e.preventDefault();

    Axios.post(baseUrl, {
      email,

    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setEmail("");
    // setPassword("");
  };

  return (
    <div className="forgot">
      <div className="forgot_text">
      {/* <h1>WELCOME TO FlyRight</h1> */}
        <h3>Forgot Password?</h3>

        <form className="forgot_form">
          {/* <h3>EmailAddress:</h3> */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="EmailAddress"
          />

          
          <button className="bts" onClick={send}>Send</button>
          {/* <Link to="/home"><button className="switch">Go Home</button></Link> */}
        </form>
      </div>
    </div>
  

  );
}

export default ForgotPassword;
