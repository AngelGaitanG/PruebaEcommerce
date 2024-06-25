import { Injectable } from '@nestjs/common';

import { User } from './user.entity';

import { usersRepository } from './users.repository';
import { Role } from 'src/auth/role.enum';



@Injectable()
export class UsersService {
    
    constructor(private readonly usersRepository: usersRepository) {}
    
    createAdmin(newRole: {role: string}, id: string) {
        return this.usersRepository.createAdmin(newRole, id);
    }


    async getAllUsers(page:number, limit: number):Promise<User[]>{
        return await this.usersRepository.getAllUsers(page, limit);
    }

    async getUserByEmail(email:string ):Promise<User>{
        return await this.usersRepository.getUserByEmail(email)

    }

    async findOne(id:string):Promise<User>{
        return await this.usersRepository.findOne(id)
    }

    async registerUser(user: Partial<User>){
        return await this.usersRepository.registerUser(user);
    }

    async updateUser(id: string, user: Partial<User>):Promise<User> {
        return await this.usersRepository.updateUser(id, user)
    }

    async deleteUser(id: string):Promise<User> {
        return await this.usersRepository.deleteUser(id);
    }
}
