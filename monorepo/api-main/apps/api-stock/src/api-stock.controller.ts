import { Controller, Get, Inject } from '@nestjs/common'
import { ApiStockService } from './api-stock.service'
import { UtilService } from '@app/util'

@Controller()
export class ApiStockController {
  constructor(private readonly apiStockService: ApiStockService) {}
  @Inject(UtilService)
  private readonly utilService: UtilService
  @Get('hello-stock')
  getHello(): string {
    return 'hello stock' + this.utilService.sum()
  }
}
