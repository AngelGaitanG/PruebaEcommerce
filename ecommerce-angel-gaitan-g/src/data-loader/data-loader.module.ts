import { Module } from '@nestjs/common';
import { DataLoaderService } from './data-loader.service';

import { ProductsService } from 'src/products/products.service';
import { CategoryService } from 'src/category/category.service';
import { Product } from 'src/products/product.entity';
import { Category } from 'src/category/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/products/products.repository';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],	
  providers: [DataLoaderService, ProductsService, ProductsRepository, CategoryService, CategoryRepository],
})
export class DataLoaderModule {}
