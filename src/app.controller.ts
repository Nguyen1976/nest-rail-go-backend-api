import { Controller, Get, Logger } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  private logger = new Logger()

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.error('11111', AppController.name)
    this.logger.debug('11111', AppController.name)
    this.logger.log('11111', AppController.name)
    this.logger.verbose('11111', AppController.name)
    this.logger.warn('11111', AppController.name)
    return this.appService.getHello()
  }
}
