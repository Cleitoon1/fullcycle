import IUseCase from "../../@shared/use-case/use-case.internface";
import IPaymentFacade, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface";

export default class PaymentFacade implements IPaymentFacade {

  private _processPaymentUseCase : IUseCase

  constructor(processPaymentUseCase : IUseCase) {
    this._processPaymentUseCase = processPaymentUseCase;
  }

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this._processPaymentUseCase.execute(input);
  }
}