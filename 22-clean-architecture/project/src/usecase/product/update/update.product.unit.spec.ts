import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const product = ProductFactory.create("a", "Product 1", 100) as Product;

const input = {
    id: product.id,
    name: "Product Updated",
    price: 101
}

describe("Unit test for update product use case", () => {
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
    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        await productRepository.create(product);
        const productUpdateUserCase = new UpdateProductUseCase(productRepository);
        
        const output = await productUpdateUserCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        })
    });    
})