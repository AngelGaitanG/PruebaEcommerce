import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Product } from "../products/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'The name of the category',
        example: 'Category 1'
    })
    @Column({length: 50, type: 'varchar', unique: true, nullable: false})
    name: string;


    @OneToMany(() => Product, product => product.category)
    @JoinColumn()
    products: Product[];
}