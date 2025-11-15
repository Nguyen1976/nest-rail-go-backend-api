import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { CCCD } from './entity/CCCD'
import { Feed } from './entity/Feed'
import { Post } from './entity/Post'
import { Tag } from './entity/Tag'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'test',
  synchronize: false,//k được bật trong môi trường production
  logging: true,
  entities: [User, CCCD, Feed, Post, Tag],
  migrations: ['./migration/*.ts' ],//đưa đường dẫn cua rphieen bản migration vào đây sau đó chạy câu lệnh để run migration là được
  subscribers: [],
})

//npx ts-node ./node_modules/typeorm/cli migration:generate ./src/migration/Xxx -d ./src/data-source.ts
