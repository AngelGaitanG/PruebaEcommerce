import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import {Repository} from "typeorm";
import { OrderDetail } from "./order-detail.entity";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
import { OrderRepository } from "./order.repository";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ){}

    async addOrder(userId: string, productIds: any): Promise<Order> {
        return this.orderRepository.addOrder(userId, productIds);
    }

    async getOrder(id: string){
        return this.orderRepository.getOrder(id);
    }

}
