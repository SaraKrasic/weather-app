import httpClient from "axios";
import { Country } from "../model/Country";
import { Temperature } from "../model/Temperature";

const COUNTRIES_API = "https://restcountries.com/v3.1/all";
const TEMPERATURE_API = "http://api.weatherbit.io/v2.0/forecast/daily";
const TEMP_KEY = "f7a3cf414e0b40d997d0c7a771e2d006";
const TEMP_DAY = 7;

export const getCountries = async (): Promise<Country[]> => {
  const response = await httpClient<Country[]>({
    url: COUNTRIES_API,
  });

  return response.status === 200 ? response.data : [];
};

export const getTemperatures = async (city: string): Promise<Temperature> => {
  const response = await httpClient<Temperature>({
    url:
      TEMPERATURE_API +
      "?key=" +
      TEMP_KEY +
      "&city=" +
      city +
      "&days=" +
      TEMP_DAY,
  });

  const c: string =
    TEMPERATURE_API + "?key=" + TEMP_KEY + "&city=" + city + "days=" + TEMP_DAY;

  console.log("URL " + c);

  return response.status === 200 ? response.data : Object.apply({});
};
