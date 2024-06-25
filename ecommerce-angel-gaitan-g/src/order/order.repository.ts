import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import {Repository} from "typeorm";
import { OrderDetail } from "./order-detail.entity";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){}

    async addOrder(userId: string, productIds: any): Promise<Order> {
        if(!userId || !productIds){
            throw new BadRequestException('El usuario y los productos son requeridos');
        }

        if (!Array.isArray(productIds)) {
        throw new BadRequestException('Los productos deben ser un arreglo');
    }
        const userFounded = await this.userRepository.findOneBy({id: userId});
        if(!userFounded){
            throw new NotFoundException('Usario no encontrando');
        }

        let total = 0;
        const updatedProducts = [];

        for(const product of productIds){
            const productFounded = await this.productRepository.findOne({where: {id: product.id}});
            if(!productFounded){
                throw new NotFoundException('Producto no encontrado');
            }
            if(productFounded.stock < 1){
                throw new NotFoundException("Lo sentimos, producto sin stock :(")
            }
            productFounded.stock -= 1;
            total += productFounded.price;
            updatedProducts.push(productFounded);
        }
        if(!updatedProducts){
            throw new NotFoundException("Los productos no llegaron..")
        }

        await this.productRepository.save(updatedProducts);

        const order = this.orderRepository.create({
            date: new Date(),
            user: userFounded,
        })

        const orderDetail = this.orderDetailRepository.create({
            price: total,
            product: updatedProducts,
        })
        await this.orderDetailRepository.save(orderDetail)

        order.orderDetail = orderDetail;
        await this.orderRepository.save(order)
        
        return order
        
    }

    async getOrder(id: string): Promise<Order> {
        if(!id){
            throw new BadRequestException('Id no ha sido enviado');
        }
        const order = await this.orderRepository.findOne({where: {id}, relations: {orderDetail: {product: true}, user: true}});
        if(!order){
            throw new NotFoundException('La orden no ha sido encontrada');
        }
        return order;
    }

    async getAllOrder(){
        return this.orderRepository.find({relations: {orderDetail: {product: true}, user: true}})
    }

}
