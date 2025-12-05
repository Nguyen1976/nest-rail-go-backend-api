import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { log } from 'console'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('orders')
  // getOrders(): any {
  //   return [
  //     { id: 1, productId: 101, quantity: 2 },
  //     { id: 2, productId: 102, quantity: 1 },
  //     { id: 3, productId: 103, quantity: 5 },
  //   ]
  // }

  @MessagePattern('orders')
  getOrders() {
    return [
      { id: 1, productId: 101, quantity: 2 },
      { id: 2, productId: 102, quantity: 1 },
      { id: 3, productId: 103, quantity: 5 },
    ]
  }
}
