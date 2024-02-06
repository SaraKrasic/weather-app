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

export const getCountries = async (): Promise<Country[]> => {
  const response = await httpClient<Country[]>({
    url: COUNTRIES_API,
  });

  return response.status === 200 ? response.data : [];
};
