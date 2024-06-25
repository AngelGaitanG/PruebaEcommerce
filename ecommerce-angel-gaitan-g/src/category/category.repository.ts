import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}

    async getCategories(): Promise<Category[]>{
        const categories = await this.categoryRepository.find({relations: {products: true}});
        if(!categories){
            throw new NotFoundException('Categories not found');
        }
        return categories
    }

    async addCategories(category: Partial<Category>):Promise<Category>{
        if(!category){
            throw new BadRequestException('Category no enviado');
        }
        const newCategory = this.categoryRepository.create(category);
        return this.categoryRepository.save(newCategory);
    }

    async findByName(name: string): Promise<Category>{
        if(!name){
            throw new BadRequestException('Name no enviado');
        }
        const category = await this.categoryRepository.findOne({where: {name}});
        if(!category){
            throw new NotFoundException('Category not found');
        }
        return category;
    }
}
