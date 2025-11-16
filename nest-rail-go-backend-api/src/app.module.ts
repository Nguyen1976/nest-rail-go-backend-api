import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { DbModule } from './db/db.module'
import { MyLoggerDev } from './logger/my.logger.dev'
import { StockModule } from './stock/stock.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Stock } from './stock/entities/stock.entity'

@Module({
  imports: [
    UserModule,
    DbModule,
    StockModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'xxxx_stock',
      synchronize: true,
      logging: true,
      entities: [Stock],
      migrations: [],
      subscribers: [],
      poolSize: 10,
      connectorPackage: 'mysql2',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MyLoggerDev],
})
export class AppModule {}
