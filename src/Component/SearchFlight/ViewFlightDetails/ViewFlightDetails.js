import React from 'react';
import "./viewFlightDetails.css";
import { useGet } from '../../../Utils/Hooks';
import axios from "axios";
import { useEffect } from 'react';

const ViewFlightDetails = ({airFlight, closeView}) => {
    // const [ airFlight ] = useGet(`http://localhost:8000/flight/${airId}`);

   

    


    return (
      <div className="vFlight">
        <div className="vflight_header">
          <h3>Air Flight Breakdown</h3>
          <button className="XxBtn" onClick={closeView}>
            <p>&#x274C;</p>
          </button>
        </div>
        <div>
          <div className="fare_total">
            <h4>Total</h4>
            <p>N {airFlight && airFlight.price * 700}.00</p>
          </div>
        </div>
        <div className="air_note">
          <h4>AirLine Name:</h4>
          <p> {airFlight && airFlight.main_airline} Airline</p>
        </div>
        <div className="air_details">
          <h4>Flight Duration: </h4>
          <p>{airFlight && Math.round(airFlight.duration / 60)} hrs</p>
        </div>
        <button className="book_now">
          <a href="/info">BOOK NOW</a>
        </button>
      </div>
    );
}

export default ViewFlightDetails;
