import React from "react";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { getCountries } from "../services/LocationService";
import { Country } from "../model/Country";

const WeatherCard = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const defaultCountry = "Netherlands";

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
      console.log(data);
    });
  }, []);

  // const defaultCountry = countries.find(
  //   (country) => country.name.common === "Netherlands"
  // );

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
              <Select defaultValue={defaultCountry}>
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.name.common}>
                    {country.flag}
                    {country.name.common}
                  </MenuItem>
                ))}
              </Select>

              <div className="inputDiv">
                <input
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
            </div>
          </div>
        </div>
      </div>
    </FormControl>
  );
};

export default WeatherCard;
