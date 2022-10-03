import { AppDataSource, createConnection } from "../../../data-source";
import { Address, Country, User } from "../../entities";

export async function setAddresses() {
  // await createConnection();
  // const user = await AppDataSource.getRepository(User).findOneBy({first_name: 'Joshua'})
  // const country = await AppDataSource.getRepository(Country).findOneBy({code: 'GBR'});
  // const address1 = new Address();
  // address1.county = 'Cardiff';
  // address1.name = 'Brian';
  // address1.number = '33';
  // address1.postcode = 'CF23 9BN';
  // address1.street_name = 'Colchester Avenue'
  // address1.user = user
  // address1.country = country
  // const address2 = new Address();
  // address2.county = 'Bath';
  // address2.name = 'Joshua';
  // address2.number = '15';
  // address2.street_name = 'The Beeches';
  // address2.postcode = 'CF23 9BN';
  // address2.user = user;
  // address2.country = country
  // const address3 = new Address();
  // address3.county = ''
  // address3.name = 'Patrick';
  // address3.number = '17';
  // address3.street_name = 'Kingwood Close';
  // address3.postcode = 'CF23 9DT';
  // address3.user = user;
  // address3.country = country;
  // await AppDataSource.getRepository(Address).save(address1);
  // await AppDataSource.getRepository(Address).save(address2);
  // await AppDataSource.getRepository(Address).save(address3);
}
