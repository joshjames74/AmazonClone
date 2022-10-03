import { Service } from "typedi";
import { EntityTarget, In } from "typeorm";
import BaseService from "./BaseService";
import { Country } from "../entities";
import { routes } from "../routes";
import axios from "axios";

@Service()
export default class CountryService extends BaseService {
  constructor() {
    super(Country);
  }

  public async getAllCountries(): Promise<Country[]> {
    const countries = await this.repository.find({});
    return countries;
  }
}
