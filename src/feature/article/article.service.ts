import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { BaseService } from '../../common/mysql/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';
import { IType } from './interface';
import { TryCatch } from '../../core/decorators/tryCatch.decorators';
import { errorLogger } from '../../common/logger';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tag/tag.services';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class ArticleService extends BaseService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly usersService: UsersService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {
    super();
  }
  public repository: Repository<Article> = this.articleRepository;
  /**
   *
   * 获取文章列表
   * @param {IType} type
   * @param {string} id
   * @returns {Promise<Article[]>}
   * @memberof ArticleService
   */
  async list(type: IType, id: string): Promise<Article[]> {
    if (type === 'categoryId') {
      const hasCategory = await this.categoryService.findOne<Category>({ id });
      if (!hasCategory) {
        throw new ApiException('分类不存在', ApiErrorCode.DATA_NO_EXIT);
      }
    } else if (type === 'tagId') {
      const hasTag = await this.tagService.findOne<Tag>({ id });
      if (!hasTag) {
        throw new ApiException('标签不存在', ApiErrorCode.DATA_NO_EXIT);
      }
    } else if (type === 'userId') {
      const hasUser = await this.usersService.findOne<Users>({ id });
      if (!hasUser) {
        throw new ApiException('用户不存在', ApiErrorCode.DATA_NO_EXIT);
      }
    }
    try {
      const list = await this.repository
        .createQueryBuilder('article')
        .where("article.status = :status", { status: 'publish' })
        .andWhere(`article.${type} = :${type}`, { [type]: id })
        .orderBy("article.publishAt", "DESC")
        .getMany();
      return list
    } catch (e) {
      errorLogger.error(e);
      throw new ApiException('系统超时', ApiErrorCode.TIMEOUT);
    }

  }
  /**
   *
   * 创建文章
   * @param {createBody} data
   * @returns
   * @memberof ArticleService
   */
  async create(data: Partial<Article>): Promise<Article> {
    if (!data.content && !data.title) {
      throw new ApiException('创建失败', ApiErrorCode.TIMEOUT);
    }
    try {
      const newArticle = await this.repository.create({
        ...data,
      });
      const res = await this.repository.save(newArticle);
      if (res) {
        return res
      } else {
        throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
      }
    } catch (e) {
      errorLogger.error(e);
      throw new ApiException('系统超时', ApiErrorCode.TIMEOUT);
    }


  }

  /**
   *
   * 更新文章
   * @param {string} id
   * @param {Partial<Article>} data
   * @param {string} userId
   * @returns {Promise<{ msg: string }>}
   * @memberof ArticleService
   */
  async updateArticle(id: string, data: Partial<Article>, userId: string): Promise<{ msg: string }> {
    let article = await this.repository.findOne({
      where: {
        id,
      }
    });
    if (article) {
      if (article.userId === userId) {
        article = {
          ...article,
          ...data
        }
        try {
          const res = this.repository.update({ id }, article);
          return { msg: '更新成功' }
        } catch (e) {
          errorLogger.error(e);
          throw new ApiException('系统超时', ApiErrorCode.TIMEOUT);
        }

      } else {
        throw new ApiException('没有权限', ApiErrorCode.NO_AUTHORIZATION);
      }
    } else {
      throw new ApiException('文章不存在', ApiErrorCode.DATA_NO_EXIT);
    }
  }
  /**
   *
   * 获取当前用户文章
   * @param {string} userId
   * @returns {Promise<Article[]>}
   * @memberof ArticleService
   */
  async userArticle(userId: string): Promise<Article[]> {
    const article = await this.repository
      .createQueryBuilder('article')
      .where("article.userId = :userId", { userId })
      .orderBy("article.publishAt", "DESC")
      .getMany()
    return article
  }
}
