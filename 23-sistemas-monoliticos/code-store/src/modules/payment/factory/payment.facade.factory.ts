import IPaymentFacade from "../facade/payment.facade.interface";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "../facade/payment.facade";

export default class PaymentFacadeFactory {
    static create(): IPaymentFacade {
      const repository = new TransactionRepository();
      const usecase = new ProcessPaymentUseCase(repository);
      const facade = new PaymentFacade(usecase);
      return facade;
    }
  }