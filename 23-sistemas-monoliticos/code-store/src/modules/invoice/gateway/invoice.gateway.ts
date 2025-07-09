import { Invoice } from "../domain/invoice.entity";

export default interface IInvoiceGateway {
    find(id: string): Promise<Invoice>;
    create(invoice: Invoice): Promise<Invoice>;
}