import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from 'axios';
import { Currency } from "../../entities";

export async function getCurrencyById(id: number): Promise<Currency> {
    const url = insertIdIntoUrl(routes.currency.currency, 'currency', id);
    const request = await axios(url, {
        method: 'GET'
    });
    return request.data
}

export async function getAllCurrencies() {
    const url = routes.currency.all;
    const request = await axios(url, {
        method: 'GET'
    });
    return request
}