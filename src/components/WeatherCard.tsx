import React from "react";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { getCountries } from "../services/LocationService";
import { Country } from "../model/Country";

const WeatherCard = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
      console.log(data);
    });
  }, []);

  return (
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
              className="countrieSelect"
              defaultValue={countries.find((country) => {
                return country.name.common === "Netherlands";
              })}
              label="Countrie"
              //onChange={}
            >
              {countries.length > 0 ? (
                <ul>
                  {countries.map((country, index) => (
                    <MenuItem key={index}>
                      <div className="flag">{country.flag}</div>
                      {country.name.common}
                    </MenuItem>
                  ))}
                </ul>
              ) : (
                <MenuItem></MenuItem>
              )}
            </Select>
            <input
              className="inputCity"
              type="text"
              placeholder="Please enter your location..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
