import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductFindUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const product1 = ProductFactory.create("a", "Product 1", 100) as Product;

describe("Unit test for find product use case", () => {
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

    it("should find product", async () => {
        const productRepository = new ProductRepository();
        await productRepository.create(product1);

        const productFindUseCase = new ProductFindUseCase(productRepository);
        
        const output = await productFindUseCase.execute({id: product1.id});

        expect(output).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        });
    }); 
    
    it("should not find product", async () => {
        const productRepository = new ProductRepository();
        const productFindUseCase = new ProductFindUseCase(productRepository);
        
        const output = await productFindUseCase.execute({id: "456"});

        expect(output).toBeNull();
    });
})