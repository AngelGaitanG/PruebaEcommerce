import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "./order.entity";
import { Product } from "../products/product.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        example: '100',
        description: 'The price of the product',
    })
    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @ApiProperty({
        example: 'UUID de una orden',
        description: 'The order',
    })
    @OneToOne(() => Order, order => order.orderDetail, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'order_id'})
    order: Order;

    @ApiProperty({
        example: 'UUID de un producto',
        description: 'The products',
    })
    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable({
        name:'orderdetails_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        }
    })
    product: Product[];
}