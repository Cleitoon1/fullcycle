import IUseCase from "../../@shared/use-case/use-case.internface";
import IInvoiceFacade, { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO, GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./invoice.facade.interface";

export default class InvoiceFacade implements IInvoiceFacade {
  private _generateInvoiceUseCase: IUseCase;
  private _findInvoiceUseCase: IUseCase;

  constructor(
    generateInvoiceUseCase: IUseCase,
    findInvoiceUseCase: IUseCase
  ) {
    this._generateInvoiceUseCase = generateInvoiceUseCase;
    this._findInvoiceUseCase = findInvoiceUseCase;
  }
    generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        return this._generateInvoiceUseCase.execute(input);
    }
    
    find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        return this._findInvoiceUseCase.execute(input);
    }
}