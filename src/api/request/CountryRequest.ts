import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import { Currency } from "../entities/Currency";
import { api_routes, routes } from "../routes";
import CountryService from "../services/CountryService";

export class CountryRequest extends RequestHandler {
  private countryService: CountryService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.countryService = new CountryService();
  }

  get() {
    if (this.matches(routes.country.id)) {
      return this.getCountryById();
    }
    if (this.matches(routes.country.all)) {
      return this.getAllCountries();
    }
  }

  async getAllCountries() {
    const countries = await this.countryService.getAllCountries();
    return this.sendResponseJSON({ countries: countries }, 200);
  }

  async getCountryById() {
    const { id } = this.req.query;
    const country = await this.countryService.getCountryById(id);
    return this.sendResponseJSON({ country: country }, 200);
  }
}
