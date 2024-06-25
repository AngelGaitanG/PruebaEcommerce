import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { DataLoaderService } from 'src/data-loader/data-loader.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService,
        private readonly dataLoaderService: DataLoaderService
    ){}

    @Post('seeder')
    async getCategoriesSeeder():Promise<Category[]>{
        await this.dataLoaderService.loadCategories();
        await this.dataLoaderService.loadProducts();
        return this.categoryService.getCategories();
    }

    @Post('add')
    async addCategories(@Body() categories: Category[]): Promise<Category[]>{
        const addedCategories = [];
        for(const category of categories){
            const existingCategory = await this.categoryService.findByName(category.name);
            if(!existingCategory){
                addedCategories.push(await this.categoryService.addCategories(category));
            }
        }
        return addedCategories
    }

    @Get()
    async getCategories(): Promise<Category[]>{
        return this.categoryService.getCategories()
        }
    
}
