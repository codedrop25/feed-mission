import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    const count = await this.categoriesRepository.count();
    if (count === 0) {
      const initialCategories = [
        { name: '영화' },
        { name: '드라마' },
        { name: '음악' },
        { name: '요리' },
        { name: '독서' },
        { name: '여행' },
        { name: '스포츠' },
        { name: '게임' }
      ];
      await this.categoriesRepository.save(initialCategories);
    }
  }

  /**
   * 모든 카테고리 목록을 조회합니다.
   */
  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }
}
