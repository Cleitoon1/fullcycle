import { or } from "sequelize";
import IUseCase from "../../../@shared/use-case/use-case.internface";
import IClientAdmFacade from "../../../client-adm/facade/client-adm.facade.interface";
import IProductAdmFacade from "../../../product-adm/facade/product-adm.facade.interface";
import IStoreCatalogFacade from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import ICheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";
import _ from "lodash";
import IInvoiceFacade from "../../../invoice/facade/invoice.facade.interface";
import IPaymentFacade from "../../../payment/facade/payment.facade.interface";
import Address from "../../../@shared/domain/value-object/address.value-object";

export default class PlaceOrderUseCase implements IUseCase
{
    private _checkoutGateway: ICheckoutGateway;
    private _clientAdmFacade: IClientAdmFacade;
    private _productAdmFacade: IProductAdmFacade;
    private _storeCatalogFacade: IStoreCatalogFacade;
    private _invoiceFacade: IInvoiceFacade;
    private _paymentFacade: IPaymentFacade;


    constructor(checkoutGateway: ICheckoutGateway, clientAdmFacade: IClientAdmFacade, 
        productAdmFacade: IProductAdmFacade, storeCatalogFacade: IStoreCatalogFacade, invoiceFacade: IInvoiceFacade, paymentFacade: IPaymentFacade) {
        this._checkoutGateway = checkoutGateway;
        this._clientAdmFacade = clientAdmFacade;
        this._productAdmFacade = productAdmFacade;
        this._storeCatalogFacade = storeCatalogFacade;
        this._invoiceFacade = invoiceFacade;
        this._paymentFacade = paymentFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this._clientAdmFacade.find({id: input.clientId});
        if(!client) {
            throw new Error("Client not found");
        }

        await this.validateProducts(input);

        const products: Product[] = await Promise.all(
            input.products.map((p) => this.getProduct(p.productId))
        );

        const myClient = new Client({
            id: client.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address({
                street: client.address.street,
                number: client.address.number,
                complement: client.address.complement,
                city: client.address.city,
                state: client.address.state,
                zipCode: client.address.zipCode,
            }),
        });

        const order = new Order({
            client: myClient,
            products: products,
        });
        const items = products.map((p) => { return { id: p.id.value, name: p.name, price: p.salesPrice}})
        const paymentResult = await this._paymentFacade.process({
            orderId: order.id.value,
            amount: order.total,
        });

        const invoice = paymentResult.status === "approved" ?
        await this._invoiceFacade.generate({
            name: myClient.name,
            document: myClient.document,
            street: myClient.address.street,
            number: myClient.address.number,
            complement: myClient.address.complement,
            city: myClient.address.city,
            state: myClient.address.state,
            zipCode: myClient.address.zipCode,
            items: items,
        }) : null;

        paymentResult.status === "approved" && order.approve();
        await this._checkoutGateway.create(order);
    
        return {
            id: order.id.value,
            invoiceId: paymentResult.status === "approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p) => {
            return {
                productId: p.id.value,
            };
            }),
        };
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if(!input.products || input.products.length === 0) {
            throw new Error("No products selected");
        }

        for (const product of input.products) {
            // Simulate a product check, e.g., checking if the product is available in stock
            const stockProduct = await this._productAdmFacade.checkStock({
                productId: product.productId,
            });

            const isProductAvailable = stockProduct && stockProduct.stock > 0;
            if (!isProductAvailable)
                throw new Error(`Product ${product.productId} is not available in stock`);
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._storeCatalogFacade.find({id: productId});
        if (!product) {
            throw new Error("Product not found");
        }

        return new Product({
            id: product.id,
            name: product.name,
            salesPrice: product.salesPrice,
            description: product.description,
        });
    }

}