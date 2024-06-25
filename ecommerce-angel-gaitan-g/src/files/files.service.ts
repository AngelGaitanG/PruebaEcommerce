import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { Repository } from 'typeorm';
import { Product } from 'src/products/product.entity';

@Injectable()
export class FilesService {
    constructor(
        private readonly fileRepository: FileRepository,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    async uploadFile(file: Express.Multer.File, id: string) {
        if(!file || !id){
            throw new BadRequestException('El archivo y el id son requeridos');
        }
        const product = await this.productsRepository.findOne({where: {id}});
        if(!product){
            throw new NotFoundException('Producto no encontrado');
        }
        const uploadResult = await this.fileRepository.uploadFile(file);
        product.imgUrl = uploadResult.secure_url;
        await this.productsRepository.save(product);

        return uploadResult;
    }
}
