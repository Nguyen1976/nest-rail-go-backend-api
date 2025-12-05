import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { EventPattern, MessagePattern } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('products')
  getProducts(): any {
    return [
      { id: 101, name: 'Product A', price: 29.99 },
      { id: 102, name: 'Product B', price: 49.99 },
      { id: 103, name: 'Product C', price: 19.99 },
    ]
  }

  @EventPattern('pick')
  handlePickEvent(data: any) {
    console.log('Pick event received:', data);
  }
}
