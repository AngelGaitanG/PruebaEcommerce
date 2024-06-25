import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ){}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createOrder(@Body() CreateOrderDto: CreateOrderDto ): Promise<Order> {
    const { userId, products } = CreateOrderDto;
    return await this.orderService.addOrder(userId, products);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getOrder(@Param("id", ParseUUIDPipe) id: string) {
    return await this.orderService.getOrder(id);
  }
}
