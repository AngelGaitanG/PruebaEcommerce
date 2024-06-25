import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from 'src/order/order.service';
import { Order } from 'src/order/order.entity';
import { OrderDetail } from 'src/order/order-detail.entity';
import { Product } from 'src/products/product.entity';
import { usersRepository } from './users.repository';
import { OrderRepository } from 'src/order/order.repository';


@Module({
  imports: [TypeOrmModule.forFeature([User, Order, OrderDetail, Product])],
  controllers: [UsersController],
  providers: [UsersService, usersRepository, OrderService, OrderRepository]
})
export class UsersModule {}
