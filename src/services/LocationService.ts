import { Country } from "../model/Country";
import { Temperature } from "../model/Temperature";

const COUNTRIES_API = "https://restcountries.com/v3.1/all";
const TEMPERATURE_API = "http://api.weatherbit.io/v2.0/forecast/daily";
const TEMP_KEY = "811fb7331a994a82846c82330518e08f";
const TEMP_DAY = 10;

export const getCountries = (): Promise<Country[]> => {
  return fetch(COUNTRIES_API)
    .then((response: Response) => response.json())
    .then((counties: Country[]) => counties)
    .catch(() => []);
};

export const getTemperatures = (
  city: string,
  country: string,
  lat: number,
  lng: number
): Promise<Temperature> => {
  if (city === "") {
    return Object.apply({});
  }
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
      throw new Error("Failed to fetch temperature data");
    });
};
