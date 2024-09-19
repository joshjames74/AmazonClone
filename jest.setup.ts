import { seedDatabase, clearDatabase } from "./seedDatabase2";
import { createConnection, closeConnection } from "./src/data-source";

beforeAll(async () => {
    await createConnection();
    
    await clearDatabase()
    await seedDatabase()
})

beforeEach(async() => {
    //await seedDatabase();
})

afterAll(async () => {
    await closeConnection();
})