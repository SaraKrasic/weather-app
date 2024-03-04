import React from "react";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { getCountries, getTemperatures } from "../services/LocationService";
import { Country } from "../model/Country";
import { Temperature, TemperatureData } from "../model/Temperature";
import { ClassNames } from "@emotion/react";

const WeatherCard = () => {
  const days = 7;
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryCode, setCountryCode] = useState<string>("");
  const defaultCountry = "Netherlands";
  const [city, setCity] = useState<string>("");
  const [temperatureData, setTemperatures] = useState<TemperatureData[]>();

  useEffect(() => {
    getCountries().then((data) => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(data);
    });
  }, []);

  let temperatures = async (event: any) => {
    event.preventDefault();
    console.log("DRZAVA code " + countryCode);
    let temperature: Temperature = await getTemperatures(city, countryCode);
    setTemperatures(temperature.data);
    return temperature.data;
  };

  let selectedCountryCode = function (event: any) {
    event.preventDefault();
    const countryName: string = event.target.value;
    let selectedC = countries.find(
      (country: Country) => country.name.common === countryName
    );
    setCountryCode(selectedC?.cca3);
  };

  function getCurrentDate() {
    let currentDate = new Date();
    const monthNames = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
    let date = currentDate.getDate();
    let year = currentDate.getFullYear();

    return `${currentMonthName} ${date} - ${date + days} ${year}`;
  }

  function getDayName(dateString: string) {
    const daysOfWeek = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
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
                <Select
                  className="select"
                  defaultValue={defaultCountry}
                  onChange={(e) => selectedCountryCode(e)}
                >
                  {countries.map((country, index) => (
                    <MenuItem key={index} value={country.name.common}>
                      {country.flag}
                      {country.name.common}
                    </MenuItem>
                  ))}
                </Select>
                <div className="inputDivSize">
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
        </div>
      </FormControl>
      {temperatureData && temperatureData.length > 0 ? (
        <>
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
              temperatureData.slice(0, days).map((item) => (
                <div>
                  <p className="temperature-d">{getDayName(item.datetime)}</p>
                  <span className="temp-days">{item.app_max_temp}</span>
                </div>
              ))
            ) : (
              <p>No temperature data available</p>
            )}
          </div>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default WeatherCard;
