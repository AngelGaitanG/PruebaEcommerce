import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv'
import { registerAs } from "@nestjs/config";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
import { OrderDetail } from "src/order/order-detail.entity"; 
import { Category } from "src/category/category.entity";
import { Order } from "src/order/order.entity";

dotenvConfig({path: '.env.development'})

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [User, Product, Order, OrderDetail, Category],
    logging: false,
    dropSchema: false
}

export default registerAs('typeorm', () => config)

export const connectionSource = new DataSource(config as DataSourceOptions)