import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpModule } from '@nestjs/axios'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'API_ORDER',
        transport: Transport.TCP,
        options: {
          port: 8888,
        }
      },
      {
        name: 'API_PRODUCT',
        transport: Transport.TCP,
        options: {
          port: 9999,
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
