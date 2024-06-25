import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../users/user.entity";
import { OrderDetail } from "./order-detail.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
@Entity()
export class Order {
    @ApiHideProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();


    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;
    

    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order, {cascade: true})
    orderDetail: OrderDetail;

    @ApiProperty({
        description: 'The user of the order',
        example: 'UUID of user'
    })
    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;
    
}


