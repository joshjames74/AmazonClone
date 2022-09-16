import sampleData from "../../../sampleData.json";
import { AppDataSource } from "../../data-source";
import { Country } from "../entities/Country";
import { Currency } from "../entities/Currency";
import { User } from "../entities/User";
import { getUserById } from "../helpers/user";
import { Product } from "../entities/Product";
import { getCurrencyById } from "../helpers/currency";

export default async function addSampleData() {
  const data = sampleData.product;

  console.log(AppDataSource);

  AppDataSource.initialize()
    .then(async () => {
      // const countryRepo = AppDataSource.getRepository(Country);
      // const currencyRepo = AppDataSource.getRepository(Currency);
      // const randomCountry = () => {
      //     const id = Math.floor(Math.random() * 5) + 1
      //     return countryRepo.findOneBy({country_id: id}).then(c => c)
      // };
      // const randomCurrency = () => {
      //     const id = Math.floor(Math.random() * 6) + 1
      //     return currencyRepo.findOneBy({currency_id: id})
      // };
      //     const randomUser = () => {
      //         const id = Math.floor(Math.random() * 3) + 1;
      //         return AppDataSource.getRepository(User).findOneBy({
      //             user_id: id
      //         });
      //     };
      //     const user = await randomUser();
      //     const currency = await getCurrencyById(1);
      //     data.forEach((v, i) => {
      //         const instance = new Product();
      //         instance.user = user;
      //         instance.title = v.title;
      //         instance.url = v.url;
      //         instance.description = v.description;
      //         instance.image_url = v.image_url;
      //         instance.image_alt = v.image_alt;
      //         instance.price = v.price;
      //         instance.currency = currency;
      //         instance.review_score = v.review_score;
      //         instance.review_count = v.review_count;
      //         console.log(instance);
      //         AppDataSource.manager.save(instance);
      //     })
    })
    .catch((error) => console.log(error));
}
