import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class ProductCreateUseCase {
    private _productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this._productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        if(!input.name)
            throw new Error("Name is required");

        if(input.price <= 0)
            throw new Error("Price must be greater than zero");

        var product = ProductFactory.create(input.type, input.name, input.price) as Product;

        await this._productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}