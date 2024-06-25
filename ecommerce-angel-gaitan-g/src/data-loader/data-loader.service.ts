import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { ProductsService } from 'src/products/products.service';
import * as data from './data.json'

@Injectable()
export class DataLoaderService {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly productsService: ProductsService
    ){}


    async loadCategories() {
        const uniqueCategories = [];
        for(const product of data.products){
            uniqueCategories.push(product.category);
        }
        for(const category of uniqueCategories){
            try {
                const existCategory = await this.categoryService.findByName(category);
                if(!existCategory){
                    await this.categoryService.addCategories({ name: category });
                }
            } catch (error) {
                if (error instanceof NotFoundException) {
                    await this.categoryService.addCategories({ name: category });
                } else {
                    throw error;
                }
            }
        }
    }
    

    async loadProducts(){
        for(const product of data.products){
            const category = await this.categoryService.findByName(product.category)
            if(category){
                await this.productsService.addProducts({...product, category: category})
            }
        }
    }

}
