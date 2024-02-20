import httpClient from "axios";
import { Country } from "../model/Country";

// export const updateCurrency = async (currency: CurrencyRequest) => {
//   const { id, ...rest } = currency;
//   const response = await httpClient<Response>({
//     url: `${APIUrls.ADMIN_CURRENCIES}/${id}`,
//     method: "PUT",
//     data: rest,
//   });

//   return { status: response.status, data: response.data };
// };

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

export const getTemperatures = async (city: string): Promise<[]> => {
  console.log("Vidim city" + city);
  const response = await httpClient<[]>({
    url:
      TEMPERATURE_API +
      "?key=" +
      TEMP_KEY +
      "&city=" +
      city +
      "days=" +
      TEMP_DAY,
  });

  console.log(response);

  return response.status === 200 ? response.data : [];
};
