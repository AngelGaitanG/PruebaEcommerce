import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Category } from "../category/category.entity";
import { OrderDetail } from "../order/order-detail.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

@Entity({
    name : 'products'
})
export class Product {
    @ApiHideProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ApiProperty({
        description: 'The name of the product',
        example: 'Product 1'})
    @Column({length: 50})
    name: string

    @ApiProperty({
        description: 'The description of the product',
        example: 'This is the first product'})
    @Column('text')
    description: string

    @ApiProperty({
        description: 'The price of the product',
        example: 100})
    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number
    
    @ApiProperty({
        description: 'The stock of the product',
        example: 10})
    @Column()
    stock: number

    @ApiProperty({
        description: 'The image url of the product',
        example: 'https://example.com/image.png'})
    @Column({nullable: true, default: 'default.png'})
    imgUrl?: string
    
    @ApiProperty({
        description: 'The category of the product',
        example: 'Category 1'
    })
    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({name: 'category_id'})
    category: Category
    
    @ApiProperty({
        description: 'The order details of the product',
        example: 'OrderDetail 1'
    })
    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.product)
    @JoinColumn()
    orderDetails: OrderDetail[];
}