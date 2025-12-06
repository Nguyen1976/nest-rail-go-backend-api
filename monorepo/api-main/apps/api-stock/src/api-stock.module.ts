import { Module } from '@nestjs/common';
import { ApiStockController } from './api-stock.controller';
import { ApiStockService } from './api-stock.service';
import { UtilModule } from '@app/util';

@Module({
  imports: [UtilModule],
  controllers: [ApiStockController],
  providers: [ApiStockService],
})
export class ApiStockModule {}
