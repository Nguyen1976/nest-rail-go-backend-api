import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class StockService {
  // @InjectEntityManager() cách cũ
  // private manager: EntityManager;

  @InjectRepository(Stock)
  private stockRepository : Repository<Stock>;

  @InjectDataSource()
  private dataSource: DataSource;

  create(createStockDto: CreateStockDto) {
    return this.stockRepository.save(createStockDto)
  }

  findAll() {
    return this.stockRepository.find();
  }

  findOne(id: number) {
    return this.stockRepository.findOne({ where: { id } });
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return this.stockRepository.update(id, updateStockDto);
  }

  remove(id: number) {
    return this.stockRepository.delete(id);
  }
}
