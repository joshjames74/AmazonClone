import axios from "axios";
import { CurrencyCode } from "../../types";
import { CurrenciesRequest } from "../request/CurrencyRequest";

export async function getAllCurrencies(): Promise<any> {
  const url = "http://localhost:3000/api/currency";
  const currencies = await axios(url, {
    method: "GET",
  });
  return currencies;
}

export async function getCurrencyById(id: number): Promise<any> {
  const url = `http://localhost:3000/api/currency/${id}`;
  const currency = await axios(url, {
    method: "GET",
  });
  return currency;
}

export async function getCurrencyByCode(code: CurrencyCode): Promise<any> {
  const url = `http://localhost:3000/api/currency/${code}`;
  const currency = await axios(url, {
    method: "GET",
  });
  return currency;
}
