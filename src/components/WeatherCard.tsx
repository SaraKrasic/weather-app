import React from "react";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { getCountries, getTemperatures } from "../services/LocationService";
import { Country } from "../model/Country";

const WeatherCard = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const defaultCountry = "Netherlands";
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
      console.log(data);
    });
  }, []);

  let temperatures = async (event: any) => {
    event.preventDefault();
    let temperature = await getTemperatures(city);
    console.log("TEMP" + temperature);
    return temperature;
  };

  return (
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
  );
};

export default WeatherCard;
