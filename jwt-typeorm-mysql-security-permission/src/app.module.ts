import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'jwt_security_permission',
      synchronize: true,
      logging: true,
      entities: [User],
      migrations: [],
      subscribers: [],
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
