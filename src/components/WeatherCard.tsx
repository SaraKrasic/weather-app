import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { getCountries, getTemperatures } from "../services/LocationService";
import { Country } from "../model/Country";
import { Temperature, TemperatureData } from "../model/Temperature";

const WeatherCard = () => {
  const days = 7;
  const latDefault = 52.5;
  const lngDefault = 5.75;
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryCode, setCountryCode] = useState<string>("NL");
  const [lat, setLat] = useState(latDefault);
  const [lng, setLng] = useState(lngDefault);
  const defaultCountry = "Netherlands";
  const [city, setCity] = useState<string>("");
  const [temperatureData, setTemperatures] = useState<TemperatureData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>(defaultCountry);

  const adaptBackground = useCallback(() => {
    let averageTemp = averageTemperature(temperatureData);
    let backgroundVar = document.body;
    let averageTempC = averageTemp ? averageTemp : 0;
    const defaultVarCornerDown1 = 255;
    const defaultVarCornerDown2 = 242;
    const defaultVarCornerDown3 = 226;
    const defaultVarCornerUp1 = 210;
    const defaultVarCornerUp2 = 237;
    const defaultVarCornerUp3 = 251;
    const changeCornerUp1 = 150;
    const changeCornerUp2 = 222;
    const changeCornerUp3 = 209;

    let tempColourCornerDown = [
      averageTempC
        ? defaultVarCornerDown1 + averageTempC
        : defaultVarCornerDown1,
      averageTempC
        ? defaultVarCornerDown2 + averageTempC
        : defaultVarCornerDown2,
      averageTempC > 0 ? averageTempC : defaultVarCornerDown3,
      1,
    ];
    let tempColourCornerUp = [
      averageTempC ? changeCornerUp1 + averageTempC : defaultVarCornerUp1,
      averageTempC ? changeCornerUp2 : defaultVarCornerUp2,
      averageTempC ? changeCornerUp3 : defaultVarCornerUp3,
      1,
    ];
    backgroundVar.style.setProperty(
      "--value-corner-down",
      `${tempColourCornerDown}`
    );
    backgroundVar.style.setProperty(
      "--value-corner-up",
      `${tempColourCornerUp}`
    );
  }, [temperatureData]);

  useEffect(() => {
    adaptBackground();
  }, [adaptBackground]);

  useEffect(() => {
    countriesGet();
  }, []);

  const countriesGet = () => {
    getCountries().then((data) => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(data);
    });
  };

  const temperatures = async (event: any) => {
    event.preventDefault();
    let temperature: Temperature = await getTemperatures(
      city,
      countryCode,
      lat,
      lng
    );
    setTemperatures(temperature.data);
    return temperature.data;
  };

  const selectedCountryCode = function (event: any) {
    event.preventDefault();
    const countryName: string = event.target.value;
    let selectedC = countries.find(
      (country: Country) => country.name.common === countryName
    );
    setSelectedOption(selectedC?.name.common || defaultCountry);
    setCountryCode(selectedC?.cca2);
    setLat(selectedC?.latlng[0] || latDefault);
    setLng(selectedC?.latlng[1] || lngDefault);
  };

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const averageTemperature = (tepmetartureArr: TemperatureData[]) => {
    let tempArray: number[] = [];
    tepmetartureArr?.forEach((element) => tempArray.push(element.app_max_temp));
    let sum = tempArray?.reduce((acc, curr) => acc + curr, 0);
    let average = sum / tempArray.length;
    return +average.toFixed(2);
  };

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
      <div className="searchCountry">
        <p className="searchCountryP">Search country name:</p>
        <input
          className="inputSearchC"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
        />
      </div>
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
                  value={selectedOption}
                  onChange={(e) => selectedCountryCode(e)}
                >
                  {filteredOptions.map((country, index) => (
                    <MenuItem key={index} value={country.name.common}>
                      {country.flag}
                      {country.name.common}
                    </MenuItem>
                  ))}
                </Select>
              </div>
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
      </FormControl>
      {temperatureData && temperatureData.length > 0 ? (
        <>
          <div className="temperature-date">
            <p>{getCurrentDate()}</p>
          </div>
          <div className="curentTemp">
            <p>
              {averageTemperature(temperatureData)}
              <span className="temperature"></span>
            </p>
          </div>
          <div className="temperature-display">
            {temperatureData ? (
              temperatureData.slice(0, days).map((item, key) => (
                <div key={key}>
                  <p className="temperature-d">{getDayName(item.datetime)}</p>
                  <span className="temp-days">{item.app_max_temp}</span>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </>
      ) : (
        <div className="showErr">
          <p>No temperature data</p>
        </div>
      )}
    </>
  );
};

export default WeatherCard;
