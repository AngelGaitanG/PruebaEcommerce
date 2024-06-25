import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { OrderService } from './order.service';
import { OrderDetail } from './order-detail.entity';
import { OrderRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, OrderDetail])],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController]
})
export class OrderModule {}
