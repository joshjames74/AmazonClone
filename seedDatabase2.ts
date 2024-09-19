import { Basket, BasketItem, Category, Order } from "./src/api/entities";
import { AppDataSource, Country, Currency, Product, User, Review } from "./src/data-source";


// define data

let country_1 = new Country()
country_1.country_id = 1
country_1.code = "UK"
country_1.name = "United Kingdom"
country_1.image_url = ""

let country_2 = new Country()
country_2.country_id = 2
country_2.code = "USA"
country_2.name = "United States of America"
country_2.image_url = ""


let currency_1 = new Currency();
currency_1.currency_id = 1
currency_1.code = "GBP"
currency_1.symbol = "£"
currency_1.gbp_exchange_rate = 1

let currency_2 = new Currency();
currency_2.currency_id = 2
currency_2.code = "USD",
currency_2.symbol = "$",
currency_2.gbp_exchange_rate = 1.27


let user_1 = new User()
user_1.user_id = 1
user_1.first_name = "John"
user_1.user_name = "John1"
user_1.title = "Mr"
user_1.image_url = ""

let user_2 = new User()
user_2.user_id = 2
user_2.first_name = "Eve"
user_2.user_name = "Eve1"
user_2.title = "Ms"
user_2.image_url = ""


let category_1 = new Category()
category_1.category_id = 1
category_1.name = "Category 1"

let category_2 = new Category()
category_2.category_id = 2
category_2.name = "Category 2"


let product_1 = new Product()
product_1.product_id = 1
product_1.title ="Test Product 1"
product_1.url = ""
product_1.description = "Test product description 1"
product_1.image_url = ""
product_1.image_alt = "Test product 1 image alt"
product_1.price = 10.00
product_1.review_score = 5.0
product_1.order_count = 0
product_1.category_ids = [1, 2]
product_1.seller = user_1
product_1.currency = currency_1

let product_2 = new Product()
product_2.product_id = 2
product_2.title ="Test Product 2"
product_2.url = ""
product_2.description = "Test product description 2"
product_2.image_url = ""
product_2.image_alt = "Test product 2 image alt"
product_2.price = 30.00
product_2.review_score = 0.0
product_2.order_count = 0
product_2.category_ids = []
product_2.seller = user_2
product_2.currency = currency_2



async function clearDatabase() {

    const productRepository = AppDataSource.getRepository(Product);
    const countryRepository = AppDataSource.getRepository(Country);
    const currencyRepository = AppDataSource.getRepository(Currency);
    const userRepository = AppDataSource.getRepository(User);
    const categoryRepository = AppDataSource.getRepository(Category);
    const basketRepository = AppDataSource.getRepository(Basket)
    const orderRepository = AppDataSource.getRepository(Order);
    const reviewRepository = AppDataSource.getRepository(Review);
    const basketItemRepository = AppDataSource.getRepository(BasketItem);

    
    // await productRepository.createQueryBuilder().delete().execute();
    // await countryRepository.createQueryBuilder().delete().execute();
    // await currencyRepository.createQueryBuilder().delete().execute();
    // await userRepository.createQueryBuilder().delete().execute();
    // await categoryRepository.createQueryBuilder().delete().execute();

    await countryRepository.delete({})
    await currencyRepository.delete({})
    await userRepository.delete({})
    await categoryRepository.delete({});
    await productRepository.delete({})
    await basketRepository.delete({})
    await orderRepository.delete({})
    await reviewRepository.delete({})
    await basketItemRepository.delete({})


    // await basketItemRepository.clear()
    // await productRepository.clear();
    // await userRepository.clear();
    // await countryRepository.clear();
    // await currencyRepository.clear();
    // await categoryRepository.clear();

    await AppDataSource.query("ALTER SEQUENCE category_category_id_seq RESTART WITH 1;")
    await AppDataSource.query("ALTER SEQUENCE country_country_id_seq RESTART WITH 1;")
    await AppDataSource.query("ALTER SEQUENCE currency_currency_id_seq RESTART WITH 1;")
    await AppDataSource.query("ALTER SEQUENCE product_product_id_seq RESTART WITH 1;")
    await AppDataSource.query("ALTER SEQUENCE user_user_id_seq RESTART WITH 1;")
}

async function seedDatabase() {

    console.log("CALLED")

    
    const productRepository = AppDataSource.getRepository(Product);
    const countryRepository = AppDataSource.getRepository(Country);
    const currencyRepository = AppDataSource.getRepository(Currency);
    const userRepository = AppDataSource.getRepository(User);
    const categoryRepository = AppDataSource.getRepository(Category);
    const basketRepository = AppDataSource.getRepository(Basket)
    const orderRepository = AppDataSource.getRepository(Order);
    const reviewRepository = AppDataSource.getRepository(Review);
    const basketItemRepository = AppDataSource.getRepository(BasketItem);

    // Insert seed data
    
    const country1 = await countryRepository.save(country_1);
    const country2 = await countryRepository.save(country_2);

    const currency1 = await currencyRepository.save(currency_1);
    const currency2 = await currencyRepository.save(currency_2);

    user_1.country = country1;
    user_1.currency = currency1;

    user_2.country = country2;
    user_2.currency = currency2;
    
    const user1 = await userRepository.save(user_1);
    const user2 = await userRepository.save(user_2);

    const category1 = await categoryRepository.save(category_1);
    const category2 = await categoryRepository.save(category_2);

        
    product_1.seller = user1
    product_2.seller = user2

    product_1.currency = currency1;
    product_2.currency = currency2;

    const product1 = await productRepository.save(product_1);
    const product2 = await productRepository.save(product_2);

    return
}

export { seedDatabase, clearDatabase, product_1, product_2 }