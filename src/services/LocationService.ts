import httpClient from "axios";
import { Country } from "../model/Country";
import { Temperature } from "../model/Temperature";

const COUNTRIES_API = "https://restcountries.com/v3.1/all";
const TEMPERATURE_API = "http://api.weatherbit.io/v2.0/forecast/daily";
const TEMP_KEY = "f7a3cf414e0b40d997d0c7a771e2d006";
const TEMP_DAY = 10;

export const getCountries = async (): Promise<Country[]> => {
  const response = await httpClient<Country[]>({
    url: COUNTRIES_API,
  });

  return response.status === 200 ? response.data : [];
};

export const getTemperatures = (
  city: string,
  country: string,
  lat: number,
  lng: number
): Promise<Temperature> => {
  if (city === "")
    alert("No parameters have been entered for city. Please enter city name.");
  return fetch(
    TEMPERATURE_API +
      "?key=" +
      TEMP_KEY +
      "&city=" +
      city +
      "&country=" +
      country +
      "&days=" +
      TEMP_DAY +
      "&lat=" +
      lat +
      "&lon=" +
      lng
  )
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch temperature data");
      }
      return response.json();
    })
    .then((temperature: Temperature) => {
      return temperature;
    })
    .catch((error: Error) => {
      alert("Data can not be returned, an error ocured!");
      return Object.apply({});
    });
};
