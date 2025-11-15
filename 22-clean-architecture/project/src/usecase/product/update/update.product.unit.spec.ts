import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase"

const product = ProductFactory.create("a", "Product 1", 100) as Product;

const input = {
    id: product.id,
    name: "Product Updated",
    price: 101
}


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUserCase = new UpdateProductUseCase(productRepository);
        
        const output = await productUpdateUserCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    });    
})