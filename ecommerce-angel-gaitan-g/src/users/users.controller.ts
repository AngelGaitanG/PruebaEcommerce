import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

import { OrderService } from 'src/order/order.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly orderService: OrderService
    ) {}

    @Put('admin/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    createAdmin(@Body()newRole: {role: string}, @Param('id')id: string){
        return this.usersService.createAdmin(newRole, id)
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBearerAuth()
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5):Promise<User[]> {
        return this.usersService.getAllUsers(page, limit);
    }

 
    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    findOne(@Param('id', ParseUUIDPipe) id: string):Promise <User> {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()

    update(@Param('id', ParseUUIDPipe) id:string, @Body() user: User):Promise<User> {
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async remove(@Param('id', ParseUUIDPipe) id:string) {
        await this.usersService.deleteUser(id);
        return {message: "Usuario eliminado"}
    }
}
