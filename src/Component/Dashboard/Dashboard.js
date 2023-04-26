import React from 'react'
import "./Dashboard.css";
import {Link} from "react-router-dom";

const Dashboard = () => {
  return (<div>
      <div className='dashboard'>
        <div className="dashboard_left">
            <h3>Dashboard</h3>
            <h3>Chat</h3>
            <h3>LogOut</h3>
        </div>
        <div className='dashboard_right'>
            <h1>WELCOME</h1>
            <div className='dashboard-image'>
            {/* <img src={Planes}/>
            <img src={Planes}/> */}
            </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Dashboard;
