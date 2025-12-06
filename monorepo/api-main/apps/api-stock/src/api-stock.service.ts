import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiStockService {
  getHello(): string {
    return 'Hello World!';
  }
}
