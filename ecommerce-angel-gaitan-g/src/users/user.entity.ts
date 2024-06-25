import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Order } from "src/order/order.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Role } from "src/auth/role.enum";
@Entity({
    name: 'users',
})
export class User {
    @ApiHideProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ApiProperty(
        {
            description: 'The name of the user',
            example: 'John'
        }
    )
    @Column({length: 50})
    name: string

    @ApiProperty(
        {
            description: 'The email of the user',
            example: 'pJXbK@example.com'
        }
    )
    @Column({length: 50, unique: true})
    email: string

    @ApiProperty(
        {
            description: 'The password of the user',
            example: 'password123.'
        }
    )
    @Exclude()
    @Column({length: 80})
    password: string

    @ApiHideProperty()
    @Exclude()
    @Column({default: 'user'})
    role: Role

    @ApiProperty(
        {
            description: 'The phone number of the user',
            example: 1234567890
        }
    )
    @Column()
    phone: number;

    @ApiProperty(
        {
            description: 'The address of the user',
            example: '123 Main St'
        }
    )
    @Column({nullable: true, length: 50})
    address?: string;

    @ApiProperty(
        {
            description: 'The country of the user',
            example: 'USA'
        }
    )
    @Column({nullable: true, length: 50})
    country?: string;

    @ApiProperty(
        {
            description: 'The city of the user',
            example: 'New York'
        }
    )
    @Column({nullable: true, length: 50, type: 'character varying'})
    city?: string;

    @ApiHideProperty()
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}