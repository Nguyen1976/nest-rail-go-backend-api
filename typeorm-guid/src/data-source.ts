import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Xxx } from './entity/Xxx'
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
  synchronize: true,
  logging: true,
  entities: [User, Xxx, CCCD, Feed, Post, Tag],
  migrations: [],
  subscribers: [],
})
