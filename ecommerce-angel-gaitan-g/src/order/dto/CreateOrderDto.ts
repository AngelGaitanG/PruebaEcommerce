import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Product } from "src/products/product.entity";

export class CreateOrderDto {
    
    @ApiProperty({
        example: 'uuid de un usuario ya cargado',
        description: 'La id de un usuario',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        example: [{'id': 'uuid de un producto ya cargado'}],
        description: 'Los ids de los productos',
    })
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Product)
    products: Product[];
}