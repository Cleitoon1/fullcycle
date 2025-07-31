import {
  BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
  } from "sequelize-typescript";
import Client from "../domain/client.entity";
import ProductOrder from "./product.order.model";
import { ClientModel } from "./client.model";
  
  
  @Table({
    tableName: "orders",
    timestamps: false,
  })
  export class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;
  
    @Column({ allowNull: true })
    declare status: string;
  
    @Column({ allowNull: true })
    declare invoiceId: string;

    @ForeignKey(() => ClientModel)
    @Column
    clientId!: string;

    @BelongsTo(() => ClientModel)
    client!: ClientModel;
    
    @HasMany(() => ProductOrder)
    products!: ProductOrder[];
  }