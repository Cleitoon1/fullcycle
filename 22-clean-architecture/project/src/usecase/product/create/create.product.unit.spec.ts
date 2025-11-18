import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductCreateUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const input = {
    type: "a",
    name: "Product 1",
    price: 100
}

describe("Unit test create product use case", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const productCreateUserCase = new ProductCreateUseCase(productRepository);
        
        const output = await productCreateUserCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: output.name,
            price: output.price
        })
    });

    it("should thrown an error when name is missing", () => {
        const productRepository = new ProductRepository();
        const productCreateUserCase = new ProductCreateUseCase(productRepository);
        
        input.name = "";
        
        expect(async () => {
            await productCreateUserCase.execute(input);
        }).rejects.toThrow("Name is required");
    })

    it("should thrown an error when price is lower or qual than 0", () => {
        const productRepository = new ProductRepository();
        const productCreateUserCase = new ProductCreateUseCase(productRepository);
        
        input.name = "Product 1";
        input.price = 0;
        
        expect(async () => {
            await productCreateUserCase.execute(input);
        }).rejects.toThrow("Price must be greater than zero");
    })    
})