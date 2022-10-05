import { AppDataSource, createConnection } from "../../../data-source";
import { Category } from "../../../api/entities";
import { Not } from "typeorm";

export async function setCategories() {
  await createConnection();
  const transaction = AppDataSource.createQueryRunner();
  await transaction.startTransaction();

  try {
    let household = new Category();
    household.name = "Household";
    household.parent = null;
    household = await AppDataSource.getRepository(Category).save(household);

    let kitchen = new Category();
    kitchen.name = "Kitchen";
    kitchen.parent = household;
    kitchen = await AppDataSource.getRepository(Category).save(kitchen);

    let garden = new Category();
    garden.name = "Garden";
    garden.parent = household;
    garden = await AppDataSource.getRepository(Category).save(garden);

    let electronics = new Category();
    electronics.name = "Electronics";
    electronics.parent = null;
    electronics = await AppDataSource.getRepository(Category).save(electronics);

    let laptops = new Category();
    laptops.name = "Laptops";
    laptops.parent = electronics;
    laptops = await AppDataSource.getRepository(Category).save(laptops);

    let chargers = new Category();
    chargers.name = "Chargers";
    chargers.parent = electronics;
    chargers = await AppDataSource.getRepository(Category).save(chargers);

    let notebooks = new Category();
    notebooks.name = "Macbooks";
    notebooks.parent = laptops;
    notebooks = await AppDataSource.getRepository(Category).save(notebooks);

    let utensils = new Category();
    utensils.name = "Utensils";
    utensils.parent = kitchen;
    utensils = await AppDataSource.getRepository(Category).save(utensils);

    let plates = new Category();
    plates.name = "Plates";
    plates.parent = utensils;
    plates = await AppDataSource.getRepository(Category).save(plates);

    let dinner = new Category();
    dinner.name = "Dinner Plates";
    dinner.parent = plates;
    dinner = await AppDataSource.getRepository(Category).save(dinner);

    let bowls = new Category();
    bowls.name = "Bowls";
    bowls.parent = utensils;
    bowls = await AppDataSource.getRepository(Category).save(bowls);
    await transaction.commitTransaction();
  } catch (error) {
    console.log(error);
    transaction.rollbackTransaction();
  } finally {
    await transaction.release();
  }
}
