import InvoiceFacade from "../facade/invoice.facade";
import IInvoiceFacade from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find/find.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";

export default class InvoiceFacadeFactory {

  static create(): IInvoiceFacade {
    const repository = new InvoiceRepository();
    const generateUseCase = new GenerateInvoiceUseCase(repository);
    const findUseCase = new FindInvoiceUseCase(repository);

    return new InvoiceFacade(
      generateUseCase,
      findUseCase
    );
  }
}