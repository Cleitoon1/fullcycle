import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

const product1 = ProductFactory.create("a", "Product 1", 100) as Product;
const product2 = ProductFactory.create("a", "Product 2", 100) as Product;

describe("Unit test for list product use case", () => {
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
    
    it("should list products", async () => {
        const productRepository = new ProductRepository();
        await productRepository.create(product1);
        await productRepository.create(product2);
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