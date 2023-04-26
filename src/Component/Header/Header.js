import React from 'react'
import "./header.css";
import {Link} from "react-router-dom";
import FlyRight from "../../Assets/images/FlyRight.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header_topbar">
            <marquee><p>For cheaper Virgin tickets, please call 08138335567</p></marquee>
      </div>
      <div className="header_navbar">
        <div className="header_navbar_text">
            <div className="header_logo">
                <Link to="/"><img src={FlyRight}/></Link>
            </div>
            <div className="header_menu">
                <ul>
                    <li>Flight</li>
                    <li>Manage my bookings</li>
                    <li>Contact</li>
                    <li>Support</li>
                </ul>
            </div>
            <div className="header_action_btn">
              <Link to="/login">
                  <button className="login_btn">Login</button>
              </Link>
              <Link to="/createAccount">
                <button>Create Account</button>
              </Link>
            </div>
        </div>
       
      </div>
    </div>
  )
}

export default Header
