import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ){}

    async getCategories(): Promise<Category[]>{
        return this.categoryRepository.getCategories()
    }

    async addCategories(category: Partial<Category>):Promise<Category>{
        return this.categoryRepository.addCategories(category)
    }

    async findByName(name: string): Promise<Category>{
        return this.categoryRepository.findByName(name)
    }
}
