import { Injectable } from '@nestjs/common';

import { Product } from './product.entity';

import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';

import { ProductsRepository } from './products.repository';



@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ){}

    async getAllProducts(page: number, limit:number):Promise<Product[]> {
        return await this.productsRepository.getAllProducts(page, limit);
    }

    async addProducts(product: CreateProductDto):Promise<Product> {
        return await this.productsRepository.addProducts(product);
    }

    async getProducts():Promise<Product[]>{
        return await this.productsRepository.getProducts();
    }

    async findByName(name: string):Promise<Product>{
        return await this.productsRepository.findByName(name);}

    async findOne(id: string):Promise<Product>{
        return await this.productsRepository.findOne(id);
    }

    async update(id: string, product: Partial<UpdateProductDto>):Promise<string>{
        return await this.productsRepository.update(id, product);
    }

    async remove(id: string):Promise<string>{
        return await this.productsRepository.remove(id);
    }
}