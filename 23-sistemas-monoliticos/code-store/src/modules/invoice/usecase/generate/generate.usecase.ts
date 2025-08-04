import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import IUseCase from "../../../@shared/use-case/use-case.internface";
import { InvoiceItem } from "../../domain/invoice-item.entity";
import { Invoice } from "../../domain/invoice.entity";
import IInvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.dto";

export default class GenerateInvoiceUseCase implements IUseCase
{
    private _invoiceGateway: IInvoiceGateway;
    constructor(invoiceGateway: IInvoiceGateway) {
        this._invoiceGateway = invoiceGateway;
    }
    
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        

        const items = input.items.map(item => new InvoiceItem({
            id: new Id(item.id).value,
            name: item.name,
            price: item.price
        }));

        let invoice = new Invoice({
            id: new Id().value,
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode
            }),
            items: items
        });

        invoice = await this._invoiceGateway.create(invoice);

        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price
            })),
            total: invoice.total
        };
    }
}