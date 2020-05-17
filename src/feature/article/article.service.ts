import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { BaseService } from '../../common/mysql/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';
import { createBody } from './interface';
import { TryCatch } from '../../core/decorators/tryCatch.decorators';
import { errorLogger } from '../../common/logger';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';

@Injectable()
export class ArticleService extends BaseService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly usersService: UsersService,
  ) {
    super();
    this.repository = this.articleRepository;
  }
  /**
   *
   * 创建文章
   * @param {createBody} data
   * @returns
   * @memberof ArticleService
   */
  async create(data: createBody) {
    if (!data.content && !data.title) {
      throw new ApiException('创建失败', ApiErrorCode.TIMEOUT);
    }
    try {


      const article = new Article(data);

      const res = await this.repository.save(article);
      if (res) {
        return {
          data: res
        }
      } else {
        throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
      }
    } catch (e) {
      errorLogger.error(e);
      throw new ApiException('系统超时', ApiErrorCode.TIMEOUT);
    }


  }
}
