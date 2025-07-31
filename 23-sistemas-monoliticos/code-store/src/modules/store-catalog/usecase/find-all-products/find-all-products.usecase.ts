import IUseCase from "../../../@shared/use-case/use-case.internface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductsUsecase implements IUseCase {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(): Promise<FindAllProductsDto> {
        const products = await this._productRepository.findAll();

        return {
            products: products.map((product) => ({
                id: product.id.value,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            })),
        }
    }
}