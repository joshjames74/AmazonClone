import { Service } from "typedi";
import { Currency } from "../entities/Currency";
import { EntityTarget, In } from "typeorm";
import BaseService from "./BaseService";

@Service()
export default class CurrencyService extends BaseService {
  constructor() {
    super(Currency);
  }

  public async getCurrencyById(id: number): Promise<Currency> {
    id = this.sanitizeId(id);
    const currency = await this.repository.findOneBy({
      currency_id: id,
    });
    return currency;
  }

  public async getCurrenciesByIds(ids: number[]): Promise<Currency[]> {
    ids = ids.map((id) => this.sanitizeId(id));
    const currencies = await this.repository.findBy({
      currency_id: In(ids),
    });
    return currencies;
  }

  // select all
  public async getAllCurrencies(): Promise<Currency[]> {
    const currencies = await this.repository.findBy({
      currency_id: In([0, 1, 2, 3, 4, 5, 6, 7]),
    });
    return currencies;
  }

  public async postCurrency(currency: Currency): Promise<number> {
    await this.repository.save(currency);
    return currency.currency_id;
  }
}
