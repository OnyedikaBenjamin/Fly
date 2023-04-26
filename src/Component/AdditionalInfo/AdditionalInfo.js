import React, { useState, useEffect } from "react";
import "./AdditionalInfo.css";
import { RiErrorWarningFill } from "react-icons/ri";
import whatsapp from "../../Assets/images/whatsapp.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdditionalInfo() {
  const [nationality, setNationality] = useState("");
  const [countries, setCountries] = useState([]);
  const [surName, setSurName] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [middleName, setMiddleName] = useState([]);
  const [emailAddress, setEmailAddress] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [DOB, setDOB] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchCountries = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data.map((country) => country.name.common);
    setCountries(countries);
  };
  
  const baseUrl = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetchCountries();
  }, []);
  const handleData = (e) => {
    e.preventDefault();
    axios.post(baseUrl, {
      "surName": surName,
      "firstName":firstName,
      "middleName":middleName,
      "DOB":DOB,
      "emailAddress":emailAddress,
      "phoneNumber":phoneNumber,
      "nationality":nationality,
    })
      .then((res) => {
        console.log(res.data);
        // res.data.isSuccessful && navigate("/login");
        

        res.data.isSuccessful && navigate("/payment",);
      })
      .catch((error) => {
        console.log(error);
      });

    setFirstName("");
    setSurName("");
    setMiddleName("");
    setEmailAddress("");
    setPhoneNumber("");
    setNationality("");
    setDOB("");
   
  };
  const [errors, setErrors] = useState({
    surName: "",
    firstName: "",
    middleName: "",
    emailAddress: "",
    phoneNumber: "",
    nationality:"",
    DOB:"",
  });
  const validateInput = (field, value) => {
    switch (field) {
      case " surName":
        if (value.length === 0) {
          setErrors((errors) => ({
            ...errors,
            surName: "Surname is required",
          }));
        } else {
          setErrors((errors) => ({ ...errors, surName: "" }));
        }
        break;
      case "firstName":
        if (value.length === 0) {
          setErrors((errors) => ({
            ...errors,
            firstName: "First Name is required",
          }));
        } else {
          setErrors((errors) => ({ ...errors, firstName: "" }));
        }
        case "middleName":
          if (value.length === 0) {
            setErrors((errors) => ({
              ...errors,
              middleName: "Middle Name is required",
            }));
          } else {
            setErrors((errors) => ({ ...errors, middleName: "" }));
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
      case "phoneNumber":
        if (value.length < 11) {
          setErrors((errors) => ({
            ...errors,
            phoneNumber: "Phonenumber is invalid",
          }));
        } else {
          setErrors((errors) => ({ ...errors, phoneNumber: "" }));
        }
        break;
      case "DOB":
        if (value.length < 8) {
          setErrors((errors) => ({
            ...errors,
            DOB: "DOB is required",
          }));
        } else {
          setErrors((errors) => ({ ...errors, DOB: "" }));
        }
        break;
      default:
        break;
    }
  };

  
  return (
    <div className="info">
      <div className="info_number">
        <ol>
          <li>Flight selected</li>
          <li>Additional Information</li>
          <li>Payment Plan</li>
          <li>Payment Method</li>
          <li>Booking Confirmation</li>
        </ol>
      </div>
      <div className="info_text">
        <h2>Additional Information</h2>
        <h5>All fields are required unless otherwise state</h5>

        <p>
          <RiErrorWarningFill /> Use all given names and surnames exactly as
          they appear on your passport/ID to avoid complications.
        </p>

        <div className="ptext">
          <h3>Traveller's Information</h3>
          <p>
            Passengers details must be entered as it appears on the passport or
            ID
          </p>
        </div>
      </div>
      <div className="info_form">
        <h3>
          Passenger 1 : ADULT (Primary Contact){" "}
          <span className="use">USE PROFILE INFO</span>
        </h3>

        <form className="infos_form">
          <select id="select">
            <option>Title</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
          </select>
          <input type="text" 
          placeholder="Surname"
          value={surName}
            onChange={(e) => {
              setSurName(e.target.value);
              validateInput("surName", e.target.value);
            }} 
          required />
           <div className="email">{errors.surName}</div>

          <input type="text" 
          placeholder="Firstname"
          value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateInput("firstName", e.target.value);
            }}  
          required />
          <div className="email">{errors.firstName}</div>

          <input
            type="text"
            name="name"
            value={middleName}
            onChange={(e) => {
              setMiddleName(e.target.value);
              validateInput("middleName", e.target.value);
            }} 
            placeholder="Middle Name (Optional)"
            required
          />
          <div className="email">{errors.middleName}</div>

          <input type="date" 
          name="date" 
          placeholder="Date of Birth" 
          value={DOB}
            onChange={(e) => {
              setDOB(e.target.value);
              validateInput("DOB", e.target.value);
            }} 
          required />
          <div className="email">{errors.DOB}</div>

          <select
            id="select"
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
          >
            <option value="">Nationality</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

          <input
            type="email"
            name="email"
            placeholder="EmailAddress"
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
              validateInput("emailAddress", e.target.value);
            }} 
            required
          />
          <div className="email">{errors.emailAddress}</div>

          <input
            type="tel"
            name="phone"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            placeholder="PhoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              validateInput("phoneNumber", e.target.value);
            }} 
            required
          />
           <div className="email">{errors.phoneNumber}</div>

          
          <div></div>
        </form>
        <div className="form-one">
          <div className="form_two">
            <input type="checkbox" />{" "}
            <p>Please send me travel deals and special offers</p>
          </div>
        </div>
        <div className="form-one">
          <div className="form_two">
            <input type="checkbox" />{" "}
            <p>
              By proceeding, I acknowledge that I have read and agreed to
              FlyRight's Flight booking <span>terms & conditions</span>
            </p>
          </div>
          <button className="btn1">back</button>
          <Link t="/payment"><button className="btn2" onClick={handleData}>Continue</button></Link>
        </div>
      </div>
      <div className="receipt">
        <div>
          <div className="receipt_form">
            <h1>Kenya Airways</h1>
            <div className="receipt_time">
              <p>
                12:15(LOS) <p>Lagos</p>
              </p>
              <p>
                29h:55m <p><hr></hr></p>{" "}
              </p>
              <p>
                7:10 <p>Rome</p>{" "}
              </p>

              <h5>&#8358;800,000 </h5>
            </div>
          </div>
          <div>
            <div className="receipt_breakdown">
              <h4>Flight Fare Breakdown</h4>
              <hr></hr>
              <div className="total">
                <p>Adults x 1 </p> <h5>&#8358;800,000 </h5>
                <p>Base Fare </p> <h5>&#8358;800,000 </h5>;
                <p>Tax</p> <h5>&#8358;800,000 </h5>
                <p>Total Fare</p> <h5>&#8358;2,400,000 </h5>
                <hr className ="hr1"></hr>
                <h2>Total:</h2> <h5>&#8358;2,400,000 </h5>
              </div>
            </div>
          </div>
        </div>
        <h2 className="contact">Contact us on Whatsapp
          <a
            href="https://api.whatsapp.com/send?phone=%2B2347034760719&text&app_absent=0"
            target="_blank">
            <img src={whatsapp} />
          </a>
        </h2>
      </div>
    </div>
  );
}

export default AdditionalInfo;
