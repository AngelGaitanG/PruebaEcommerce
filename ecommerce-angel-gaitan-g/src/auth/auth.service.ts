import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/LoginUserDto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { Role } from './role.enum';



@Injectable()
export class AuthService {
    constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
    ) {}

    async signIn(LoginUserDto: LoginUserDto) {
        const {email, password} = LoginUserDto;

        if(!email || !password) {
            throw new UnauthorizedException('Las Credenciales son requeridas')
        }

        const dbUser = await this.usersService.getUserByEmail(email)

        if(!dbUser) {
            throw new BadRequestException('Credenciales invalidas')
        }

        if(!dbUser.password || !password){
            throw new BadRequestException('algo salio mal')
        }

        const isPasswordValid = bcrypt.compare(password, dbUser.password) 

        if(!isPasswordValid) {
            throw new BadRequestException('Credenciales invalidas')
        }

        const userPayload = {
            sub: dbUser.id,
            id: dbUser.id,
            email: dbUser.email,
            roles: [dbUser.role]
        }

        const token = this.jwtService.sign(userPayload)

        return {success: true, token: token};
    }

    async signUp(user: CreateUserDto) {

        const dbUser = await this.usersService.getUserByEmail(user.email)

        if(dbUser) {
            throw new BadRequestException(' el usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        
        if(!hashedPassword) {
            throw new BadRequestException('La contraseña no pudo ser hasheada')
        }

        return this.usersService.registerUser({...user, password: hashedPassword}) 
    }
}
