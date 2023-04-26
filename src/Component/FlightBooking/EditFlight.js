import React, {useState } from 'react';
import "./flightBooking.css";
import { useNavigate } from 'react-router-dom';
import { IoMdAirplane, IoMdArrowDropdown } from "react-icons/io";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { FaSyncAlt, FaUser, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useGet } from '../../Utils/Hooks';
import  Axios  from 'axios';


const EditFlight = (props) => {

const [cities] = useGet("http://localhost:8000/cities");

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

const flightBookingData = {
    "tripType" : "",
    "numberOfPassenger" : "",
    "flightCategory" : "",
    "from" : "",
    "to" : "",
    "departureDateTime" : "",
    "returnDateTime" : ""
}
  
  const [ flightData, setFlightData ] = useState(flightBookingData)
  const [ isVisible, setIsVisible ] = useState(false);
  const [ showCities, setShowCities ] = useState(false);
  const [ showCit, setShowCit ] = useState(false);
  const [ user, setUser ] = useState(passenger); 
  const [ total, setTotal ] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Click is working")

    const flightBookingData = {
        "tripType" : flightData.tripType,
        "numberOfPassenger" : total,
        "flightCategory" : flightData.flightCategory,
        "origin" : iata,
        "destination" : fromIata,
        "departureDateTime" : flightData.departureDateTime,
        "returnDateTime" : flightData.returnDateTime
    }

        Axios.post("https://jsonplaceholder.typicode.com/posts", flightBookingData)
        .then(res => {
            console.log(res.data)
            res.status === 201 ? navigate("/searchFlight",
            {state:{
                from:city,
                to:toCity,
                departureDateTime:res.data.departureDateTime,
                returnDateTime:res.data.returnDateTime,
                flightCategory:res.data.flightCategory,
                adult:user.adult,
                children:user.children,
                infants:user.infants
            }}
        ) : console.log("No available flight for this booking")
        }).catch(err => {
            console.log(err)
        });
        props.cancelEdit()
    }
  
  return (
    <div className="flight_booking">
      <div className="flight_booking_field">

     <form onSubmit={handleSubmit}>
        <div>
            <div className='form_one'>
                <div className="form_one_option">
                    <div className="round">
                        <div>
                            <FaSyncAlt/>
                        </div>
                        <div>
                            <select name="tripType" value={flightData.tripType} onChange={handleChange} >
                                <option>Round-Trip</option>
                                <option>One-Way</option>
                                <option>Mulltiple-City</option>
                            </select>
                        </div>
                    </div>

                    <div className="user_number">
                            <div className="total" onClick={showDrop}>
                                <FaUser/>
                                <p name="numberOfPassenger">{total}</p>
                                <IoMdArrowDropdown/>
                            </div>
                            <div>
                                <div className={isVisible ? "num" : "hidenum"}>
                                    <div className="amount">
                                        <p>Adult</p>
                                        <div className="counter">
                                            <FaMinusCircle onClick={() => countDown(1)}/>
                                            <p>{user.adult}</p>
                                            <FaPlusCircle onClick={() => countUp(1)}/>
                                        </div>
                                    </div>
                                    <div className="amount">
                                        <p>Children</p>
                                        <div className="counter">
                                            <FaMinusCircle onClick={() => countDown(2)}/>
                                            <p>{user.children}</p>
                                            <FaPlusCircle onClick={() => countUp(2)}/>
                                        </div>
                                    </div>
                                    <div className="amount">
                                        <p>Infants</p>
                                        <div className="counter">
                                            <FaMinusCircle onClick={() => countDown(3)}/>
                                            <p>{user.infants}</p>
                                            <FaPlusCircle onClick={() => countUp(3)}/>
                                        </div>
                                    </div>
                                    <div className="btnn">
                                        <button onClick={(e) => handleCancel(e)}>Cancel</button>
                                        <button onClick={(e) => handleTotal(e)}>Done</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div>
                        <select name="flightCategory" value={flightData.flightCategory} onChange={handleChange}>
                            <option>Premium Economy</option>
                            <option>Economy</option>
                            <option>Business Class</option>
                            <option>First Class</option>
                        </select>
                    </div>
                    <button className="XBtn" onClick={props.cancelEdit} ><p>&#x274C;</p></button>
                </div>
            </div>
        </div>
        <div>
            <div className="form_two">
                <div className='from'>
                    <div>    
                        <IoMdAirplane className="plane"/>
                    </div>
                    <div className="from_input">
                        <p>From</p>
                        <input type="text" name="from" value={city} placeholder="Enter City" onFocus={showCity} onChange={handleChange} required/>
                        <div className={showCities ? "current_location" : "hide_location"}>

                            <h3>Cities</h3>
                            <div className='cities'>
                            {cities && cities.map((city, index) => {
                                return <div key={city.id} onClick={() => pickCity(city.id, index)}>
                                            <p>{city.name}</p>
                                        </div>
                            })}
                            </div>

                        </div>
                    </div>
                </div>


                <div className='from'>
                    <div>    
                        <MdLocationPin className="plane"/>
                    </div>
                    <div className="from_input">
                        <p>To</p>
                        <input type="text" name="to" value={ toCity} placeholder="Enter City" onFocus={showCty} onChange={handleChange} required/>
                        <div className={showCit ? "current_location" : "hide_location"}>

                            <h3>Cities</h3>
                            <div className='cities'>
                            {cities && cities.map((city) => {
                                return <div key={city.id} onClick={() => pickToCity(city.id)}>
                                            <p>{city.name}</p>
                                        </div>
                            })}
                            </div>

                        </div>
                    </div>
                </div>

                <div className='from'>
                    <div>    
                        <MdDateRange className="plane"/>
                    </div>
                    <div className="from_input">
                        <p>Departure</p>
                        <input type="date" name="departureDateTime" value={flightData.departureDateTime} onChange={handleChange} required/>
                    </div>
                </div>

                <div className='from'>
                    <div>    
                        <MdDateRange className="plane"/>
                    </div>
                    <div className="from_input">
                        <p>Return</p>
                        <input type="date" name="returnDateTime" value={flightData.returnDateTime} onChange={handleChange} required/>
                    </div>
                </div>
                    <button className="src_flight_btn" onClick={handleSubmit}>Search Flight</button>
            </div>
        </div>
        </form>

      </div>
    </div>
  )
}

export default EditFlight;
