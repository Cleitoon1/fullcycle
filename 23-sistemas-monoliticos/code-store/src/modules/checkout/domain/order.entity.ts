import IAggregateRoot from "../../@shared/domain/entity/aggregate-root-.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
    id?: string;
    client: Client;
    products: Product[];
    status?: string;
    invoiceId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Order extends BaseEntity implements IAggregateRoot {
    private _client: Client;
    private _products: Product[];
    private _status: string;
    private _invoiceId: Id;

    constructor(props: OrderProps) {
        super(new Id(props.id), props.createdAt, props.updatedAt);
        this._client = props.client;
        this._products = props.products;
        this._status = props.status;
        this._invoiceId = new Id(props.invoiceId);
    }

    get client(): Client {
        return this._client;
    }

    get products(): Product[] {
        return this._products;
    }

    get status(): string {
        return this._status;
    }

    get total(): number {
        return this._products.reduce((total, product) => total + product.salesPrice, 0);
    }

    get isApproved(): boolean {
        return this._status === "approved";
    }

    get invoiceId(): string {
        return this._invoiceId.value;
    }

    approve(): void {
        this._status = "approved";
    }
}

