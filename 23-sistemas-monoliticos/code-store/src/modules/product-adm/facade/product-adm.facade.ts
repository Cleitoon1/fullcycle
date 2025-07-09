import Id from "../../@shared/domain/value-object/id.value-object";
import IUseCase from "../../@shared/use-case/use-case.internface";
import IProductAdmFacade, {
    AddProductFacadeInputDto,
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";


export interface UseCasesProps {
    addUseCase: IUseCase,
    stockUseCase: IUseCase,
}

export default class ProductAdmFacade implements IProductAdmFacade {
    
    private _addUseCase: IUseCase;
    private _stockUseCase: IUseCase;

    constructor(UseCases: UseCasesProps) {
        this._addUseCase = UseCases.addUseCase;
        this._stockUseCase = UseCases.stockUseCase;        
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
        let product = {
            id: new Id(input.id || ""),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        }

        return this._addUseCase.execute(product);
      }

      checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._stockUseCase.execute(input);
      }
}