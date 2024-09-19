import { closeConnection, createConnection } from "../../../data-source";
import dotenv from 'dotenv';
import { Connection } from "pg";
import Container from "typedi";
import ProductService from ".";
import { Product } from "../../entities";
import { product_1, product_2 } from "../../../../seedDatabase2";


describe('getAllProducts', () => {

    let productService: ProductService

    beforeAll(async () => {
       productService = Container.get(ProductService);
    });

    it('should initalize the ProductService', () => {
        expect(productService).toBeDefined();
        expect(productService).toBeInstanceOf(ProductService);
    })

    it('should return a non-empty defined array', async () => {
        const products = await productService.getAllProducts();

        // Check that it is defined
        expect(products).toBeDefined();

        // Check if the result is an array
        expect(Array.isArray(products)).toBe(true);

        // Check that its length is greater than zero
        expect(products.length).toBeGreaterThan(0);
    })

    it('should return array of products', async () => {
        const products = await productService.getAllProducts();
        // Check that each product is of type product
        products.forEach(product => {
            expect(product).toBeInstanceOf(Product);
        });
    })

    it('should return all products', async () => {

        const products = await productService.getAllProducts();
        const expectedProducts = [product_1, product_2];

        expect(products).toEqual(expect.arrayContaining(expectedProducts))
        expect(products.length).toEqual(2);

    })

    it('should return products with correct fields and types', async() => {
        const products = await productService.getAllProducts();
        products.forEach(product => {
            expect(product).toHaveProperty('product_id');
            expect(product).toHaveProperty('seller');
            expect(product).toHaveProperty('title');
            expect(product).toHaveProperty('url');
            expect(product).toHaveProperty('description');
            expect(product).toHaveProperty('image_url');
            expect(product).toHaveProperty('image_alt');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('currency');
            expect(product).toHaveProperty('review_score');
            expect(product).toHaveProperty('order_count');
            expect(product).toHaveProperty('category_ids');
        })
    })
}) 