import React from "react";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { getCountries, getTemperatures } from "../services/LocationService";
import { Country } from "../model/Country";
import { Temperature, TemperatureData } from "../model/Temperature";

const WeatherCard = () => {
  const days = 7;
  const [countries, setCountries] = useState<Country[]>([]);
  const defaultCountry = "Netherlands";
  const [city, setCity] = useState<string>("");
  const [temperatureData, setTemperatures] = useState<TemperatureData[]>();

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  let temperatures = async (event: any) => {
    event.preventDefault();
    let temperature: Temperature = await getTemperatures(city);
    console.log("TEMP " + JSON.stringify(temperature.data));
    setTemperatures(temperature.data);

    return temperature.data;
  };

  function getCurrentDate(separator = "") {
    let currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
    let date = currentDate.getDate();
    let year = currentDate.getFullYear();

    return `${currentMonthName} ${date} - ${date + days} ${year}`;
  }

  function getDayName(dateString: string) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  return (
    <>
      <FormControl fullWidth>
        <div className="container">
          <div className="inputDiv">
            <div className="inlineDiv">
              <div className="imgDiv">
                <img
                  className="cloudImg"
                  src={require(".././images/sun-cloud.png")}
                  alt="weather img"
                ></img>
              </div>
              <div className="selectDiv">
                <Select defaultValue={defaultCountry} className="select">
                  {countries.map((country, index) => (
                    <MenuItem key={index} value={country.name.common}>
                      {country.flag}
                      {country.name.common}
                    </MenuItem>
                  ))}
                </Select>
                <form onSubmit={temperatures}>
                  <div className="inputDiv">
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      placeholder="Please enter your location..."
                      className="inputCity"
                    />
                    <button type="submit" className="searchButton">
                      <img
                        src={require(".././images/search.png")}
                        alt="search"
                        className="search"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </FormControl>
      <div className="temperature-date">
        <p>{getCurrentDate()}</p>
      </div>
      <div className="curentTemp">
        <p>
          {temperatureData?.[0]?.app_max_temp}
          <span className="temperature"></span>
        </p>
      </div>
      <div className="temperature-display">
        {temperatureData ? (
          temperatureData.map((item) => (
            <div>
              <p className="temperature-d">{getDayName(item.datetime)}</p>
              <p className="temp-days">{item.app_max_temp}°C</p>
            </div>
          ))
        ) : (
          <p>No temperature data available</p>
        )}
      </div>
    </>
  );
};

export default WeatherCard;
