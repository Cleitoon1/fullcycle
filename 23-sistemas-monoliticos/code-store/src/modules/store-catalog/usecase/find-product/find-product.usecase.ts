import IUseCase from "../../../@shared/use-case/use-case.internface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindProductUseCase implements IUseCase {

    private _productRepository: ProductGateway;
        
    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }
    
    async execute(input: any): Promise<any> {
        const product = await this._productRepository.find(input.id);

        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        };
    }

}