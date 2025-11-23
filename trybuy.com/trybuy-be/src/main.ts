import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add validate in global
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor()); // <<< Áp dụng interceptor
  app.useGlobalFilters(new HttpExceptionFilter()); // <<< Áp dụng filter
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
