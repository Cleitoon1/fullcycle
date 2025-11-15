import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductFindUseCase from "./find.product.usecase";

const product1 = ProductFactory.create("a", "Product 1", 100) as Product;


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product1)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for find product use case", () => {
    it("should find product", async () => {
        const productRepository = MockRepository();
        const productFindUseCase = new ProductFindUseCase(productRepository);
        
        const output = await productFindUseCase.execute({id: product1.id});

        expect(output).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        });
    }); 
    
    it("should not find product", async () => {
        const productRepository = MockRepository();
        const productFindUseCase = new ProductFindUseCase(productRepository);
        
        MockRepository().find.mockReturnValue(Promise.resolve(null));

        const output = await productFindUseCase.execute({id: "456"});

        expect(output).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        });
    });
})