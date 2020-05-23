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

  }
  public repository: Repository<Category> = this.categoryRepository;
  /**
   *
   * 保存分类
   * @param {CategorySaveDto} data
   * @returns {Promise<Category>}
   * @memberof CategoryService
   */
  async save(data: Partial<Category>): Promise<Category> {
    const hasCategory = await this.repository.findOne({ where: { title: data.title } });

    if (!hasCategory) {
      let category = new Category(data);
      const res = await this.repository.save(category);
      if (res) {
        return res
      } else {
        throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
      }
    } else {
      throw new ApiException('分类已存在', ApiErrorCode.CREATE_FAIL);
    }
  }
  /**
   *
   * 获取列表 或者单个详情
   * @param {string} [id]
   * @returns {(Promise<Category | Category[] | string>)}
   * @memberof CategoryService
   */
  async list(id?: string): Promise<Category | Category[] | string> {
    let res = null;
    if (id) {
      res = await this.repository.findOne({
        where: {
          id
        }, relations: ["tags"]
      });
      if (!res) {
        return ''
      }
    } else {
      res = await this.repository.find();
    }
    return res
  }
}
