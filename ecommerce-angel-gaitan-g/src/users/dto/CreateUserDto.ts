import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user',
        minLength: 3,
        maxLength: 80
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({
        example: 'pJXbK@example.com',
        description: 'The email of the user'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password',
        description: 'The password of the user',
        minLength: 8,
        maxLength: 15
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak',
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    password: string;

    @ApiProperty({
        example: '123 Main St',
        description: 'The address of the user',
        minLength: 3,
        maxLength: 80
    })
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({
        example: 1234567890,
        description: 'The phone number of the user'
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number

    @ApiProperty({
        example: 'USA',
        description: 'The country of the user',
        minLength: 5,
        maxLength: 20
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @ApiProperty({
        example: 'New York',
        description: 'The city of the user',
        minLength: 5,
        maxLength: 50
    })
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    city: string;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin: boolean;
}