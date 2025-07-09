import IUseCase from "../../../@shared/use-case/use-case.internface";
import IInvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find.dto";

export default class FindInvoiceUseCase implements IUseCase {

    private _invoiceGateway: IInvoiceGateway;

    constructor(invoiceGateway: IInvoiceGateway) {
        this._invoiceGateway = invoiceGateway;
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this._invoiceGateway.find(input.id);

        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode
            },
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price
            })),
            createdAt: invoice.createdAt,
            total: invoice.total
        };
    }

}