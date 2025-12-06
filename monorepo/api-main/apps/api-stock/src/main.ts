import { NestFactory } from '@nestjs/core';
import { ApiStockModule } from './api-stock.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiStockModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
