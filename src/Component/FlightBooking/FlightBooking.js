import React, { useState, useEffect } from 'react';
import "./flightBooking.css";
import { useNavigate } from 'react-router-dom';
import { IoMdAirplane, IoMdArrowDropdown } from "react-icons/io";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { FaSyncAlt, FaUser, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useGet } from '../../Utils/Hooks';
import  Axios  from 'axios';
import { useContext } from 'react';
import { LoggedContext } from '../../App';




// {state:{
//                 booking:{
//                         from:city,
//                         to:toCity,
//                         departureDateTime:flightData.departureDateTime,
//                         returnDateTime:flightData.returnDateTime,
//                         flightCategory:flightData.flightCategory,
//                         adult:user.adult,
//                         children:user.children,
//                         infants:user.infants
//                         },
//                 // airLines:res["data"].data.prices
//                 }


const FlightBooking = () => {

     const cities = [
    {
      "id": 1,
      "name": "Berlin",
      "title": "Berlin, Germany",
      "iata": "BER"
    },
    {
      "id": 2,
      "name": "London",
      "title": "London, United Kindom",
      "iata": "LON"
    },
    {
      "id": 3,
      "name": "Johannesburg",
      "title": "Johannesburg, South Africa",
      "iata": "JNB"
    },
    {
      "id": 4,
      "name": "New York",
      "title": "New York, America",
      "iata": "NYC"
    },
    {
      "id": 5,
      "name": "Dubai",
      "title": "United Arab Emirates, Dubai",
      "iata": "DXB"
    }
  ]

// const [cities] = useGet("http://localhost:8000/cities");

const navigate = useNavigate();


let passenger = {
    "adult" : 0,
    "children" : 0,
    "infants" : 0
}

 const [ city, setCity ] = useState([]);
  const [ toCity, setToCity ] = useState([]);
  const [ iata, setIata ] = useState([]);
  const [ fromIata, setFromIata] = useState([]);

const {checkUser, setCheckUser} = useContext(LoggedContext);

const flightBookingData = {
    "tripType" : "",
    "numberOfPassenger" : "",
    "flightCategory" : "",
    "from" : "",
    "to" : "",
    "departureDateTime" : "",
    "returnDateTime" : ""
}

  const [ isValid, setIsValid ] = useState(false);
  const [ flightData, setFlightData ] = useState(flightBookingData)
  const [ isVisible, setIsVisible ] = useState(false);
  const [ showCities, setShowCities ] = useState(false);
  const [ showCit, setShowCit ] = useState(false);
  const [ user, setUser ] = useState(passenger); 
  const [ total, setTotal ] = useState(0);
  const [ dateErrMsg, setDateErrMsg ] = useState();
 
  useEffect(() => {
    // Code to execute after state has been updated
  }, [isValid]);

  const showDrop = () => {
    setIsVisible(!isVisible);
  }

  const showCity = () => {
    setShowCities(!showCities);
    showCit && setShowCit(!showCit);
  }

  const showCty = () => {
    setShowCit(!showCit);
    showCities && setShowCities(!showCities);
  }

  const pickCity = (id, index) => {
    cities.forEach((ct) => {
        if(ct.id === id){
            setCity(ct.title)
            setIata(ct.iata)
            cities.splice(index, 1)
        }
    })
    setShowCities(!showCities);
  }

  const pickToCity = (id) => {
    cities.forEach((ct) => {
        if(ct.id === id){
            setToCity(ct.title)
            setFromIata(ct.iata)
        }
    })
    setShowCit(!showCit);
  }

  const countUp = (id) => {
    if(id === 1){
        setUser(prevState => ({
            ...prevState,
            adult:prevState.adult + 1
        }));
    }else if(id === 2){
        setUser(prevState => ({
            ...prevState,
            children:prevState.children + 1
        }));
    }else if(id === 3){
        setUser(prevState => ({
            ...prevState,
            infants:prevState.infants + 1
        }));
    }
  }

   const validateRegData = (postRegData) => {
     for (let key in postRegData) {
       if (postRegData[key] === "") {
         alert(`${key} cannot be empty`);
         return false;
       }
     }
   };


  const countDown = (id) => {
    if(id === 1){
        if(user.adult > 0){ 
        setUser(prevState => ({
            ...prevState,
            adult:prevState.adult - 1
        }));
      }
    }else if(id === 2){
        if(user.children > 0){ 
        setUser(prevState => ({
            ...prevState,
            children:prevState.children - 1
        }));
      }
    }else if(id === 3){
        if(user.infants > 0){ 
        setUser(prevState => ({
            ...prevState,
            infants:prevState.infants - 1
        })) 
      }
    }
  }

  const handleTotal = (e) => {
    e.preventDefault();
    const userTotal = user.adult + user.children + user.infants;
    setTotal(userTotal)
    setIsVisible(!isVisible)
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setUser(prevState => ({
        ...prevState,
        adult:0,
        children:0,
        infants: 0
    }));
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFlightData({
        ...flightData,
        [name] : value
  })
  }

  const flightApi =
    "https://ce99-102-88-62-64.ngrok-free.app/api/v1/get-flights";
//   "https://jsonplaceholder.typicode.com/posts";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (checkUser === null){
        alert("kindly log in to access flight data")
        console.log("hi hi");
        return
    }

    const flightBookingData = {
        "tripType" : flightData.tripType,
        "numberOfPassenger" : total,
        "flightCategory" : flightData.flightCategory,
        "origin" : iata,
        "destination" : fromIata,
        "departureDateTime" : flightData.departureDateTime,
        "returnDateTime" : flightData.returnDateTime
    }
    const valResult = validateRegData(flightBookingData);
    console.log(`logging val result ${valResult}`);
    if (valResult === false) return;

    setDateErrMsg(validateDate(flightBookingData.departureDateTime, flightBookingData.returnDateTime))
    console.log("2." + isValid)

    console.log(flightBookingData);

    if(isValid === true){
        Axios.post(flightApi, {origin:flightBookingData.origin, destination:flightBookingData.destination})
        .then(res => {
            console.log(res);
            console.log(res["data"].data.prices)
            res.status === 200 ? navigate("/searchFlight",{
                state: {flightData: res["data"].data.prices}
            }
            
        ):console.log("an error occur")
    }).catch(err => {
        console.log(err)
    });
        console.log("3." + isValid)
    }}

const validateDate = (deptTime, retTime) => {
  const deptDate = new Date(deptTime);
  const retDate = new Date(retTime);
  const currentDate = new Date();
  let err;

  // Remove the time component from the dates by setting them to the same date with a zero time value
  currentDate.setHours(0, 0, 0, 0);
  deptDate.setHours(0, 0, 0, 0);
  retDate.setHours(0, 0, 0, 0);

  if (isNaN(deptDate.getTime()) || isNaN(retDate.getTime())) {
    err = "Invalid Date Format!!";
  } else if (deptDate < currentDate) {
    err = "Departure Date must not be in the past!!";
  } else if (retDate < deptDate) {
    err = "Invalid Return Date!!";
  } else {
    // Dates are valid and return date is after departure date
    setIsValid((prevState) => (prevState = true));
  }

  console.log("1." + isValid);
  return err;
};





   
    // const validateDate = (deptTime, retTime) => {
    //     let err;
    //     if(retTime >= deptTime){
    //         setIsValid(prevState => prevState = true)
    //     }else{
    //         err = "Invalid Return Date!!"
    //     }
    //     console.log("1." + isValid)
    //     return(err)
    // }
    
    return (
      <div className="flight_booking">
        <div className="flight_booking_text">
          <div className="flight">
            <IoMdAirplane />
            <p>FLIGHTS</p>
          </div>
          <div className="check">
            <BsPatchCheckFill className="ch" />
            <p>We offer the best deals in the industry!</p>
          </div>
        </div>
        <div className="flight_booking_field">
          <form>
            <div>
              <div className="form_one">
                <div className="form_one_option">
                  <div className="round">
                    <div>
                      <FaSyncAlt />
                    </div>
                    <div>
                      <select
                        name="tripType"
                        value={flightData.tripType}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          --Choose your trip type--
                        </option>
                        <option>Round-Trip</option>
                        <option>One-Way</option>
                        <option>Mulltiple-City</option>
                      </select>
                    </div>
                  </div>

                  <div className="user_number">
                    <div className="total" onClick={showDrop}>
                      <FaUser />
                      <p name="numberOfPassenger">{total}</p>
                      <IoMdArrowDropdown />
                    </div>
                    <div>
                      <div className={isVisible ? "num" : "hidenum"}>
                        <div className="amount">
                          <p>Adult</p>
                          <div className="counter">
                            <FaMinusCircle onClick={() => countDown(1)} />
                            <p>{user.adult}</p>
                            <FaPlusCircle onClick={() => countUp(1)} />
                          </div>
                        </div>
                        <div className="amount">
                          <p>Children</p>
                          <div className="counter">
                            <FaMinusCircle onClick={() => countDown(2)} />
                            <p>{user.children}</p>
                            <FaPlusCircle onClick={() => countUp(2)} />
                          </div>
                        </div>
                        <div className="amount">
                          <p>Infants</p>
                          <div className="counter">
                            <FaMinusCircle onClick={() => countDown(3)} />
                            <p>{user.infants}</p>
                            <FaPlusCircle onClick={() => countUp(3)} />
                          </div>
                        </div>
                        <div className="btnn">
                          <button onClick={(e) => handleCancel(e)}>
                            Cancel
                          </button>
                          <button onClick={(e) => handleTotal(e)}>Done</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <select
                      name="flightCategory"
                      value={flightData.flightCategory}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        --Choose your flight type--
                      </option>
                      <option>Premium Economy</option>
                      <option>Economy</option>
                      <option>Business Class</option>
                      <option>First Class</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="form_two">
                <div className="from">
                  <div>
                    <IoMdAirplane className="plane" />
                  </div>
                  <div className="from_input">
                    <p>From</p>
                    <input
                      type="text"
                      name="from"
                      value={city}
                      placeholder="Enter City"
                      onFocus={showCity}
                      onChange={handleChange}
                      required
                    />
                    <div
                      className={
                        showCities ? "current_location" : "hide_location"
                      }
                    >
                      <h3>Cities</h3>
                      <div className="cities">
                        {cities &&
                          cities.map((city, index) => {
                            return (
                              <div
                                key={city.id}
                                onClick={() => pickCity(city.id, index)}
                              >
                                <p>{city.name}</p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="from">
                  <div>
                    <MdLocationPin className="plane" />
                  </div>
                  <div className="from_input">
                    <p>To</p>
                    <input
                      type="text"
                      name="to"
                      value={toCity}
                      placeholder="Enter City"
                      onFocus={showCty}
                      onChange={handleChange}
                      required
                    />
                    <div
                      className={showCit ? "current_location" : "hide_location"}
                    >
                      <h3>Cities</h3>
                      <div className="cities">
                        {cities &&
                          cities.map((city) => {
                            return (
                              <div
                                key={city.id}
                                onClick={() => pickToCity(city.id)}
                              >
                                <p>{city.name}</p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="from">
                  <div>
                    <MdDateRange className="plane" />
                  </div>
                  <div className="from_input">
                    <p>Departure</p>
                    <input
                      type="date"
                      name="departureDateTime"
                      value={flightData.departureDateTime}
                      min="2023-03-14"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="from">
                  <div>
                    <MdDateRange className="plane" />
                  </div>
                  <div className="from_input">
                    <p>Return</p>
                    <input
                      type="date"
                      name="returnDateTime"
                      value={flightData.returnDateTime}
                      min="2023-03-14"
                      onChange={handleChange}
                      required
                    />
                    <p className="er">{dateErrMsg}</p>
                  </div>
                </div>
                <button className="src_flight_btn" onClick={handleSubmit}>
                  Search Flight
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
    }


export default FlightBooking
