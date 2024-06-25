import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { DataLoaderService } from 'src/data-loader/data-loader.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/product.entity';
import { ProductsRepository } from 'src/products/products.repository';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoryService, DataLoaderService, ProductsRepository, ProductsService, CategoryRepository],
  controllers: [CategoryController]
})
export class CategoryModule {}
