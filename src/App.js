
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Landing/Home';
import Header from "./Component/Header/Header";
import Login from "./Component/Login/Login";
import CreateAccount from "./Component/CreateAccount/CreateAccount";
import SearchFlight from './Component/SearchFlight/SearchFlight';
import ForgotPassword from './Component/ForgotPassword/Forget';
import Dashboard from './Component/Dashboard/Dashboard';
import Otp from './Component/OTP/Otp';
import { createContext } from 'react';
import { useState } from 'react';
import Payment from './Component/Payment/Payment';
import ResetPassword from './Component/ResetPassword/ResetPassword';
import AdditionalInfo from './Component/AdditionalInfo/AdditionalInfo';

export const LoggedContext = createContext();

function App() {

  const [checkUser, setCheckUser] = useState(null);


  return (
    <div className="App">
      <LoggedContext.Provider value={{checkUser, setCheckUser}}>
      <Router>
          <Header/>
          
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/searchFlight" element={<SearchFlight/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/createAccount" element={<CreateAccount/>}/>
            <Route path="/forgot" element={<ForgotPassword/>}/>
            <Route path="/dash" element={<Dashboard/>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/reset" element={<ResetPassword/>}/>
            <Route path="/info" element={<AdditionalInfo/>}/>

            
          </Routes>
      </Router>
      </LoggedContext.Provider>
    </div>
  );
}

export default App;
