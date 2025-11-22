import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { Permission } from './user/entities/permission.entity'
import { Role } from './user/entities/role.entity'
import { AdminModule } from './admin/admin.module'
import { APP_GUARD } from '@nestjs/core'
import { LoginGuard } from './login.guard'
import { PermissionRabcGuard } from './user/permission-rabc.guard'

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
      entities: [User, Permission, Role],
      migrations: [],
      subscribers: [],
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionRabcGuard,
    },
  ],
})
export class AppModule {}
