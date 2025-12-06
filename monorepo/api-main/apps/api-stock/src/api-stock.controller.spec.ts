import { Test, TestingModule } from '@nestjs/testing';
import { ApiStockController } from './api-stock.controller';
import { ApiStockService } from './api-stock.service';

describe('ApiStockController', () => {
  let apiStockController: ApiStockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiStockController],
      providers: [ApiStockService],
    }).compile();

    apiStockController = app.get<ApiStockController>(ApiStockController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiStockController.getHello()).toBe('Hello World!');
    });
  });
});
