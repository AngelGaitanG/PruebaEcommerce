
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { DataLoaderService } from 'src/data-loader/data-loader.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService,
        private readonly dataLoaderService: DataLoaderService
    ) {}

    @Post('seeder')
    async seedProducts(): Promise<Product[]> {
        await this.dataLoaderService.loadCategories();
        await this.dataLoaderService.loadProducts();
        return this.productsService.getProducts();
    }
    @Post('add')
    async addProducts(@Body() product: CreateProductDto): Promise<Product> {
        return this.productsService.addProducts(product);
    }

    @Get()
    async getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<Product[]> {
        return this.productsService.getAllProducts(page, limit);
    }
    @Get(':id')
    getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        
        return this.productsService.findOne(id);
    }

    @Post('create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBearerAuth()
    createProduct(@Body() product: CreateProductDto): Promise<Product> {
        return this.productsService.addProducts(product);
    }

    @Put(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBody({type: Object})
    @ApiBearerAuth()
    async updateProduct(@Body() product: Partial<UpdateProductDto>, @Param('id', ParseUUIDPipe) id:string): Promise<string> {
        
        return this.productsService.update(id, product);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBearerAuth()
    deleteProduct(@Param('id', ParseUUIDPipe) id:string):Promise<string> {
        return this.productsService.remove(id);
    }

}
