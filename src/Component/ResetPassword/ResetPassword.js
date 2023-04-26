import React, { useState } from "react";
import "./ResetPassword.css";
import Axios from "axios";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [oldpassword, setOldPassword] = useState([]);
  const [newpassword, setNewPassword] = useState([]);
  const [confirmpassword, setConfirmPassword] = useState([]);

  const baseUrl = "https://jsonplaceholder.typicode.com/posts";

  const reset = (e) => {
    e.preventDefault();

    Axios.post(baseUrl, {
      oldpassword,
      newpassword,
      confirmpassword,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="reset">
      <div className="reset_text">
        <h3>Reset Password?</h3>

        <form className="reset_form">
          <input
            type="password"
            name="password"
            value={oldpassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            placeholder="Old Password"
          />
          <input
            type="password"
            name="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="New Password"
          />
          <input
            type="password"
            name="password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm New Password"
          />

          <button className="reset_bts" onClick={reset}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
