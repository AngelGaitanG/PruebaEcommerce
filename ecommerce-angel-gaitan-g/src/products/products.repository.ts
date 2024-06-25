import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';
import { Category } from 'src/category/category.entity';



@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async getAllProducts(page: number, limit: number):Promise<Product[]> {
        if(!page || !limit) {
            throw new BadRequestException('La pagina y el limite son requeridos');
        }
        if (page < 1 || limit < 1) {
        throw new BadRequestException('La pagina y el limite deben ser mayor a 0');
        }
        const [products] = await this.productsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: { category: true },
        });
        return products;
    }

    // CREA UN PRODUCTO CON LOS DATOS RECIBIDOS
    async addProducts(product: CreateProductDto):Promise<Product> {
        if(!product){
            throw new BadRequestException('Producto no enviado');
        }
        const categoryFound = await this.categoryRepository.findOne({where: {id: product.category.id}});
        if(!categoryFound){
            throw new NotFoundException('Categoria no encontrada');
        }
        
        return this.productsRepository.save(product);
    }

    // BUSCA TODOS LOS PRODUCTOS
    async getProducts(): Promise<Product[]> {
        const products = await this.productsRepository.find({
            relations: ['category']});
        return products
    }

    // BUSCA POR NOMBRE

    async findByName(name:string):Promise<Product>{
        if(!name){
            throw new BadRequestException('Propiedad name no enviada');
        }
        const product = await this.productsRepository.findOne({where: {name}})
        if(!product){
            throw new NotFoundException('Producto no encontrado');
        }
        return product
    }

    // BUSCA POR ID
    async findOne(id:string){
        if(!id){
            throw new BadRequestException('Id no enviado');
        }
        const product = await this.productsRepository.findOne({where: {id}})
        if(!product){
            throw new NotFoundException('Producto no encontrado');
        }
        return product
    }

    
    async update(id: string, product: UpdateProductDto):Promise<string> {
        if(!id || !product){
            throw new BadRequestException('Datos no enviados');
        }
        const updatedProduct = await this.productsRepository.update(id, product)
       if(!updatedProduct){
           throw new NotFoundException('Producto no encontrado');
       }
        return id
    }

    async remove(id: string): Promise<string> {
        if(!id){
            throw new BadRequestException('Id no enviado');
        }
        const product = await this.productsRepository.findOne({where: {id}})
        if(!product){
            throw new NotFoundException('Producto no ha sido encontrado');
        }
        this.productsRepository.delete(id)
        return id;
    }
}