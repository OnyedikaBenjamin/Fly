import React from 'react'
import "./home.css";
import FlightBooking from '../FlightBooking/FlightBooking';
import NewsLetter from '../NewsLetter/NewsLetter';
import blueRibbon from "../../Assets/images/blue_ribbon.png";
import protocol from  "../../Assets/images/protocol.png";
import visa from  "../../Assets/images/visa.png";

function Home() {
  return (
    <div className="home">
        <div className='home_hero'>
          <h1>Going Somewhere?</h1>
        </div>
        <div className="home_booking">
          <FlightBooking/>
        </div>
        <div className="bonus">
            <div className="bag">
                <img src={blueRibbon} alt="Blue Ribbon"/>
                <div className="bag_content">
                  <h3>Blue Ribbon</h3>
                  <p>We offer global baggage protection on all site</p>
                </div>
            </div>
            <div className="bag">
                <img src={protocol} alt="Protocol"/>
                <div className="bag_content">
                  <h3>Protocol Service</h3>
                  <p>We offer global baggage protection on all site</p>
                </div>
            </div>
            <div className="bag">
                <img src={visa} alt="Visa"/>
                <div className="bag_content">
                  <h3>Visa Assistance</h3>
                  <p>We offer global baggage protection on all site</p>
                </div>
            </div>
        </div>
        <div className='news_letter'>
          <NewsLetter/>
        </div>
    </div>
  )
}

export default Home