import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { firstValueFrom } from 'rxjs'
import { HttpService } from '@nestjs/axios'
import { ClientProxy } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Inject('API_ORDER')
  private orderClient: ClientProxy
  @Get('orders')
  async getOrders(): Promise<any> {
    return this.orderClient.send('orders', '')
  }

  @Inject('API_PRODUCT')
  private productClient: ClientProxy
  @Get('products')
  async getProducts(): Promise<any> {
    this.productClient.emit('pick', 'log products')
    return this.productClient.send('products', '')
  }
}
