import IUseCase from "../../../@shared/use-case/use-case.internface";
import { Transaction } from "../../domain/transaction";
import IPaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements IUseCase
{

    private _transactionRepository: IPaymentGateway;
    
    constructor(transactionRepository: IPaymentGateway) {
        this._transactionRepository = transactionRepository;
    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId,
          });
          transaction.process();
          
          const persistTransaction = await this._transactionRepository.save(transaction);
      
          return {
            transactionId: persistTransaction.id.value,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
          };
    }
}