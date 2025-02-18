import React, { useState, useEffect, useRef, useContext } from "react";
import "./Radio.css";
import EndlessDial_Banner from "../assets/EndlessDial_Banner";
import RadioPlayer from "../components/RadioPlayer";
import AddOption from "../components/AddOption";

function Radio() {
  const [userStations, setUserStations] = useState([]);

  //Get the user's radio stations from the database
  useEffect(() => {
    async function getRadio() {
      const response = await fetch("http://localhost:5000/get-radio");
      if (!response.ok) {
        console.log("fetchData() fetch error occured");
        return;
      }
      const records = await response.json();
      if (!records) {
        console.log("fetchData() records not located");
        return;
      }
      setUserStations(records);
    }
    getRadio();
  });

  const stationList = userStations.map((station) => (
    <li key={station._id} className="station">
      <RadioPlayer
        src={station.url}
        img={station.image}
        title={station.title}
        artist={station.broadcaster}
        ident={station._id}
      />
    </li>
  ));

  return (
    <div className="radio page">
      <h1>Endless Dial</h1>
      <EndlessDial_Banner width="80%" height="auto" />
      <ul>
        <li>
          <RadioPlayer
            src="https://strm112.1.fm/back280s_mobile_mp3"
            img="https://pea.fm/uploads/posts/2021-03/1615135575_1_fm-a-list-80s.png"
            title="Back to the 80's"
            artist="1.FM"
          />
        </li>
        {stationList}
        <AddOption />
      </ul>
    </div>
  );
}

export default Radio;
