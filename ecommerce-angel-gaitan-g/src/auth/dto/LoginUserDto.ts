import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        example: 'pJXbK@example.com',
        description: 'The email of the user'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'Password123.',
        description: 'The password of the user'
    })
    @IsNotEmpty()
    password: string;
}