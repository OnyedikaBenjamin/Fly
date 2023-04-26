import React, { useState } from 'react';
import "./searchFlight.css";
import { useLocation } from 'react-router-dom';
import ViewFlightDetails from './ViewFlightDetails/ViewFlightDetails';
import { useEffect } from 'react';
import axios from 'axios';

const SearchFlight = () => {
  const location = useLocation();
  const [details, setDetails] = useState([]);

useEffect(() => {
    setDetails(location.state.flightData);
},[])
       
  const [ showEdit, setShowEdit ] = useState(false);
  const [ showAirView, setShowAirVies ] = useState(false);
  const [ airLineId, setAirLineId ] = useState(null);
  const [airCodes, setAirCodes] = useState([]);

   const options = {
     method: "GET",
     url: "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/en-GB/airlines.json",
     headers: {
       "X-Access-Token": "158bac6b46f73503986540b6e022b2ae",
       "X-RapidAPI-Key": "d834321b38msh0cdad8e30508789p119f2ajsn9ea9e60f7cd3",
       "X-RapidAPI-Host":
         "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
     },
   };

    const changeAirLineName = (data) => {
      console.log("hihihi");
      // console.log(airCodes[9].code);
      for (let i =0; i < airCodes.length; i++){
        if (airCodes[i].code === data){
              console.log("consoling air line code");
              console.log(airCodes[i]);
        }
      }
      // for (let key in airCodes) {
      //   if (airCodes[key].code === details.main_airline) {
      //     console.log("consoling air line code");
      //     console(airCodes[key]);
      //   }
      // }
    };

    const getAllAirlineCodes = async () => {
      try {
        let req = await axios.request(options);
        let data = req.data
        console.log("loggging data");
        setAirCodes(data)
        console.log(airCodes);
      }catch(err){
        console.error(err);
      }
  //   await axios
  //  .request(options)
  //  .then(function (response) {
  //    setAirCodes(response.data);
  //    console.log("consoling airline data");
  //    console.log(airCodes);
  //      changeAirLineName("VS");
  //  })
  //  .catch(function (error) {
  //    console.error(error);
  //  });
    }

   useEffect(() => {
    getAllAirlineCodes();

   }, []);

  
    
   

  const handleEdit = () => {
    setShowEdit(!showEdit)
  }

  const cancelEdit = () => {
    setShowEdit(!showEdit)
  }

  const toggleAirView = (id) => {
    // console.log(details);
    setAirLineId(details[id])
      setShowAirVies(true);
  }

  const closeAirView = (id) => {
    setShowAirVies(false);
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  return (
    <div className="search_flight">
      {/* <div className="search_flight_select">
            { showEdit === true ? <EditFlight cancelEdit={cancelEdit}/> : <div className="search_flight_content">
                <div className="search_fllgth_text">
                    <div>
                      <p>Current Location</p>
                      <p>{flightDetails.from}</p>
                    </div>
                    <div>
                      <p>Destination</p>
                      <p>{flightDetails.to}</p>
                    </div>
                    <div>

                      <p>Daparture Date</p>
                      <p>{flightDetails.departureDateTime}</p>
                    </div>
                    <div>
                      <p>Return Date</p>

                      <p>{flightDetails.returnDateTime}</p>
                    </div>
                    
                    <div className="total_passenger">
                      <div>
                          <p>Adult</p>
                          <p>{flightDetails.adult}</p>
                      </div>
                      <div>
                        <p>Children</p>
                        <p>{flightDetails.children}</p>
                      </div>
                      <div>
                        <p>Infants</p> 
                        <p>{flightDetails.infants}</p>
                      </div>
                    </div>
                    <div>
                      <p>Category</p>
                      <p>{flightDetails.flightCategory}</p>
                    </div>
                </div>

                <button onClick={handleEdit}>Edit</button>
            </div>} 

       </div> */}
      <div className="air">
        <div className="air_available_flight">
          {details.map((data, id) => (
            <div className="air_lines">
              <div>
                <p>{(data.main_airline)}</p>
              </div>
              <div>
                <p>Depart Time</p>
                <p>{formatDate(data.found_at)}</p>
                <p>{data.destination}</p>
              </div>
              <div>
                <p>Arrival Date</p>
                <p>{formatDate(data.depart_date)}</p>
                <p>{data.origin}</p>
              </div>
              <div className="air_line_price">
                <p>N {data.price * 700}.00</p>
              </div>
              <button onClick={() => toggleAirView(id)}>View</button>
            </div>
          ))}

          {/* {availableFlight && availableFlight.slice(0, 5).map((air, index) => {
            return <div key={index} className="air_lines">
                      <p>{air.Name}</p>
                      <div>
                        <p>{air.DepartTime}</p>
                        <p>{air.FromCity}</p>
                      </div>
                      <div>
                        <p>{air.ArriveTime}</p>
                        <p>{air.ToCity}</p>
                      </div>
                      <div className="air_line_price">
                        <p>{air.Price}</p>
                        <button onClick={() => toggleAirView(air.id)}>View</button>
                      </div>
                    </div>
          })} */}
        </div>
        <div className={showAirView ? "air_flight_details" : "hideAirDetails"}>
          <ViewFlightDetails airFlight={airLineId} closeView={closeAirView} />
        </div>
      </div>
    </div>
  );

}
export default SearchFlight;
