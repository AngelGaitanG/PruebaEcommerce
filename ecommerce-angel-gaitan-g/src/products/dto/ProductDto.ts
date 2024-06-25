import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Category } from "src/category/category.entity";

export class CreateProductDto {
  @ApiProperty({
    example: 'Product 1',
    description: 'The name of the product',
    minLength: 3,
    maxLength: 80
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({
    example: 'This is the first product',
    description: 'The description of the product',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 10,
    description: 'The stock of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The image url of the product',
  })
  @IsNotEmpty()
  @IsString()
  imgUrl?: string;

  @ApiProperty({
    example: 'uuid de una categoria ya cargada',
    description: 'The category of the product',
  })
  @IsNotEmpty()
  @IsString()
  category: Category
}

export class UpdateProductDto {
  @ApiProperty({
    example: 'Product 1',
    description: 'The name of the product',
    minLength: 3,
    maxLength: 80
  })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name?: string;

  @ApiProperty({
    example: 'This is the first product',
    description: 'The description of the product',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the product',
  })
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: 10,
    description: 'The stock of the product',
  })
  @IsNumber()
  stock?: number;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The image url of the product',
  })
  @IsString()
  imgUrl?: string;

  @ApiProperty({
    example: 'uuid de una categoria ya cargada',
    description: 'The category of the product',
  })
  @IsString()
  category?: Category;

  
}


