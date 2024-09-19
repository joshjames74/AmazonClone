import Container from "typedi";
import CategoryService from ".";
import { Category } from "../../entities";
import { FilterType } from "../../../redux/reducers/product";
import { CategoryResponse } from "../ProductService";

describe('getCategoryById', () => {

    let categoryService: CategoryService;

    beforeAll(async () => {
        categoryService = Container.get(CategoryService);
    });

    it('should initialize the CategoryService', () => {
        expect(categoryService).toBeDefined();
        expect(categoryService).toBeInstanceOf(CategoryService);
    })

    it('should return a category object for successful id', async () => {
        const category = await categoryService.getCategoryById(1);
        expect(category).toBeDefined();
        expect(category).toBeInstanceOf(Category);
    })

    it('should return null for invalid id', async () => {
        const category = await categoryService.getCategoryById(3);
        expect(category).toBeNull();
    })

})


describe('getAllCategories', () => {

    let categoryService: CategoryService;

    beforeAll(async () => {
        categoryService = Container.get(CategoryService);
    })

    it('should return a non-empty array of categories responses', async () => {
        const queryParams = {
            query: "",
            categories: [],
            priceMin: 0,
            priceMax: 100,
            reviewMin: 0,
            start: 0,
            end: 10,
            filterType: FilterType.NONE
        }
        const categories = await categoryService.getAllCategories(queryParams);
        expect(Array.isArray(categories)).toBe(true);
    })
})