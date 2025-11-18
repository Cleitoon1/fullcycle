import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import FindProductDto, { FindProductOutput } from "./find.product.dto";

export default class ProductFindUseCase {
       private _productRepository: ProductRepositoryInterface;
    
        constructor(productRepository: ProductRepositoryInterface){
            this._productRepository = productRepository;
        }
    
        async execute(input: FindProductDto): Promise<FindProductOutput> {
            const product = await this._productRepository.find(input.id);

            if(product === null)
                return null;

            return {
                id: product.id,
                name: product.name,
                price: product.price
            };
        }
}