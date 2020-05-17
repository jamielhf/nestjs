import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/mysql/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';
import { ICategory } from './interfaces/index';
import { CategorySaveDto } from './dto/category.dto';
import { logger, errorLogger } from 'src/common/logger';



@Injectable()
export class CategoryService extends BaseService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super();
    this.repository = this.categoryRepository;
  }
  async save(data: CategorySaveDto) {
    const hasCategory = await this.repository.findOne({ title: data.title });

    if (!hasCategory) {
      let category: ICategory = new Category(data);
      const res = await this.repository.save(category);
      if (res) {
        return {
          data: res
        }
      } else {
        throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
      }
    } else {
      throw new ApiException('分类已存在', ApiErrorCode.CREATE_FAIL);
    }
  }
  async list(id?: string) {
    let res = null;
    if (id) {
      console.log(id);
      res = await this.repository.find({
        where: {
          id
        }, relations: ["tags"]
      });
      if (!res) {
        return []
      }
    } else {
      res = await this.repository.find({});
    }
    return res
  }
}
