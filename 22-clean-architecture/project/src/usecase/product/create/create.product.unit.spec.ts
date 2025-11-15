import ProductCreateUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Product 1",
    price: 100
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUserCase = new ProductCreateUseCase(productRepository);
        
        const output = await productCreateUserCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: output.name,
            price: output.price
        })
    });

    it("should thrown an error when name is missing", () => {
        const customerRepository = MockRepository();
        const productCreateUserCase = new ProductCreateUseCase(customerRepository);
        
        input.name = "";
        
        expect(async () => {
            await productCreateUserCase.execute(input);
        }).rejects.toThrow("Name is required");
    })

    it("should thrown an error when price is lower or qual than 0", () => {
        const customerRepository = MockRepository();
        const productCreateUserCase = new ProductCreateUseCase(customerRepository);
        
        input.name = "Product 1";
        input.price = 0;
        
        expect(async () => {
            await productCreateUserCase.execute(input);
        }).rejects.toThrow("Price must be greater than zero");
    })    
})