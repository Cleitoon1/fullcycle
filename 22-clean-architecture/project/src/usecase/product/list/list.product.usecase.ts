import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductDTO } from "./list.product.dto";

export default class ProductListUseCase {
       private _productRepository: ProductRepositoryInterface;
    
        constructor(productRepository: ProductRepositoryInterface){
            this._productRepository = productRepository;
        }
    
        async execute(): Promise<OutputListProductDTO> {
            const products = await this._productRepository.findAll();
            
            return {
                products: products.map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price
                    }
                })
            }
        }
}