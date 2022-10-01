import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import { Currency } from "../entities/Currency";
import { api_routes, routes } from "../routes";
import CurrencyService from "../services/CurrencyService";

export type CurrenciesRequest = {
  body: {
    currencies: Currency[];
  };
};

export class CurrencyRequest extends RequestHandler {
  private currencyService: CurrencyService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.currencyService = new CurrencyService();
  }

  get() {
    if (this.matches(routes.currency.all)) {
      return this.getAllCurrencies();
    }
    if (this.matches(routes.currency.convert_currency)) {
      return this.convertCurrency();
    }
  }

  async getAllCurrencies() {
    const currencies = await this.currencyService.getAllCurrencies();
    return this.sendResponseJSON({ currencies: currencies }, 200);
  }

  async convertCurrency() {
    console.log(this.req.query);
    let { currency, value, newCurrency } = this.req.query;
    currency = JSON.parse(currency);
    newCurrency = JSON.parse(newCurrency);
    const convertedValue = await this.currencyService.convertCurrency(
      currency,
      value,
      newCurrency
    );
    return this.sendResponseJSON({ value: convertedValue }, 200);
  }
}
