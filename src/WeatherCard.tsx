import React from "react";

const WeatherCard = () => {
  return (
    <div className="container">
      <div className="inputDiv">
        <div className="inlineDiv">
          <img src={require("./images/sun-cloud.png")} alt="weather img"></img>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
