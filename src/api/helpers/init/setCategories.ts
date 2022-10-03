import { AppDataSource, createConnection } from "../../../data-source";
import { Category } from "../../../api/entities";
import { Not } from "typeorm";

export async function setCategories() {
  await createConnection();
  // await AppDataSource.getRepository(Category).delete({})
  const transaction = AppDataSource.createQueryRunner();
  await transaction.startTransaction();

  try {
    let household = new Category();
    household.name = "Household";
    household.parent = null;
    household = await AppDataSource.getRepository(Category).save(household);
    //await transaction.commitTransaction();

    let kitchen = new Category();
    kitchen.name = "Kitchen";
    kitchen.parent = household;
    kitchen = await AppDataSource.getRepository(Category).save(kitchen);
    //await transaction.commitTransaction();

    let garden = new Category();
    garden.name = "Garden";
    garden.parent = household;
    garden = await AppDataSource.getRepository(Category).save(garden);
    //await transaction.commitTransaction();

    let electronics = new Category();
    electronics.name = "Electronics";
    electronics.parent = null;
    electronics = await AppDataSource.getRepository(Category).save(electronics);
    //await transaction.commitTransaction();
    // const electronics = await AppDataSource.getRepository(Category).findOneBy({name: 'Electronics'})
    // const laptops = await AppDataSource.getRepository(Category).findOneBy({name: 'Laptops'})
    // const chargers = await AppDataSource.getRepository(Category).findOneBy({name: 'Chargers'})
    // const household = await AppDataSource.getRepository(Category).findOneBy({name: 'Household'})
    // const kitchen = await AppDataSource.getRepository(Category).findOneBy({name: 'Kitchen'})
    // const garden = await AppDataSource.getRepository(Category).findOneBy({name: 'Garden'})

    let laptops = new Category();
    laptops.name = "Laptops";
    laptops.parent = electronics;
    laptops = await AppDataSource.getRepository(Category).save(laptops);
    //await transaction.commitTransaction();

    let chargers = new Category();
    chargers.name = "Chargers";
    chargers.parent = electronics;
    chargers = await AppDataSource.getRepository(Category).save(chargers);
    //await transaction.commitTransaction();

    let notebooks = new Category();
    notebooks.name = "Macbooks";
    notebooks.parent = laptops;
    notebooks = await AppDataSource.getRepository(Category).save(notebooks);
    //await transaction.commitTransaction();

    let utensils = new Category();
    utensils.name = "Utensils";
    utensils.parent = kitchen;
    utensils = await AppDataSource.getRepository(Category).save(utensils);
    //await transaction.commitTransaction();

    let plates = new Category();
    plates.name = "Plates";
    plates.parent = utensils;
    plates = await AppDataSource.getRepository(Category).save(plates);
    //await transaction.commitTransaction();

    let dinner = new Category();
    dinner.name = "Dinner Plates";
    dinner.parent = plates;
    dinner = await AppDataSource.getRepository(Category).save(dinner);
    //await transaction.commitTransaction();

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

// const categories = {
//     "Household": [
//         {
//             "Kitchen": []
//         },
//         {
//             "Garden": []
//         },
//         {
//             "DIY": []
//         }
//     ],
//     "Electronics": [
//         {
//             "Laptops": [
//                 {
//                     "Macbooks": []
//                 },
//                 {
//                     "Dell": []
//                 }
//             ],
//             "Phones": [
//                 {
//                     "iPhones": []
//                 },
//                 {
//                     "Chargers": []
//                 }
//             ]
//         }
//     ]
// };

// async function add(cats, dataSource, parent: Category) {
//     for (const [key, value] of Object.values(cats)) {
//         const newCategory = new Category();
//         newCategory.name = key;

//     }
// }
