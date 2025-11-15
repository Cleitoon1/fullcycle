import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product 1", 100) as Product;
const product2 = ProductFactory.create("a", "Product 2", 100) as Product;


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for list product use case", () => {
    it("should list products", async () => {
        const productRepository = MockRepository();
        const productListUseCase = new ListProductUseCase(productRepository);
        
        const output = await productListUseCase.execute();

        expect(output.products.length).toBe(2);
        expect(output.products[0]).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        });
        expect(output.products[1]).toEqual({
            id: product2.id,
            name: product2.name,
            price: product2.price
        })
    });    
})