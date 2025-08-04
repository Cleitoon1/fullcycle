import Address from "../../@shared/domain/value-object/address.value-object";
import { InvoiceItem } from "../domain/invoice-item.entity";
import { Invoice } from "../domain/invoice.entity";
import IInvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements IInvoiceGateway {
    async find(id: string): Promise<Invoice> {
        return await InvoiceModel.findOne({
            where: { id },
            include: ["invoiceItems"]
        }).then((invoice) => {
            const items = (invoice.get("invoiceItems") as InvoiceItemModel[]) || [];
            return new Invoice({
                id: invoice.id,
                name: invoice.name,
                document: invoice.document,
                address: new Address({
                    street: invoice.street,
                    number: invoice.number,
                    complement: invoice.complement,
                    city: invoice.city,
                    state: invoice.state,
                    zipCode: invoice.zipCode
                }),
                items: items.map(item => (new InvoiceItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }))),
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt
            });
        })
    }

    async create(invoice: Invoice): Promise<Invoice> {
        await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });

        if(!invoice.items || invoice.items.length === 0)
            return invoice;
        
        await InvoiceItemModel.bulkCreate(
            invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
                invoiceId: invoice.id.value,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }))
        );

        return invoice;
    }
}