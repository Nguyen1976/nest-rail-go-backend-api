import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Xxx } from './entity/Xxx'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [User, Xxx],
  migrations: [],
  subscribers: [],
})
