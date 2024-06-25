import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Order } from 'src/order/order.entity';
import { usersRepository } from 'src/users/users.repository';


@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  providers: [AuthService, UsersService, usersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
