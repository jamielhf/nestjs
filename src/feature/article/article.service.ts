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
import { updateBody } from './dto/article.dto';

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
        .where('article.status = :status', { status: 'publish' })
        .andWhere(`article.${type} = :${type}`, { [type]: id })
        .orderBy('article.publishAt', 'DESC')
        .getMany();
      return list;
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
        return res;
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
  async updateArticle(
    id: string,
    data: updateBody,
    userId: string,
  ): Promise<{ msg: string }> {
    let article = await this.repository.findOne({
      where: {
        id,
      },
    });
    if (article) {
      if (article.userId === userId) {
        const { tagId, categoryId, ...updateData } = data;
        if (tagId) {
          const hasTag = await this.tagService.findOne<Tag>({ id: tagId });
          if (!hasTag) {
            throw new ApiException('标签不存在', ApiErrorCode.DATA_NO_EXIT);
          }
          article.tag = hasTag;
        }
        if (categoryId) {
          const hasCategory = await this.categoryService.findOne<Category>({
            id: categoryId,
          });
          if (!hasCategory) {
            throw new ApiException('分类不存在', ApiErrorCode.DATA_NO_EXIT);
          }
          article.category = hasCategory;
        }
        article = {
          ...article,
          ...updateData,
        };
        try {
          const query = await this.repository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.category', 'category')
            .leftJoinAndSelect('article.tag', 'tag')
            .update('article')
            .where('article.id = :id', { id })
            .set({ ...article })
            .execute();
          if (query.raw.affectedRows === 1) {
            return { msg: '更新成功' };
          } else {
            return { msg: '更新失败' };
          }
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
      .where('article.userId = :userId', { userId })
      .orderBy('article.publishAt', 'DESC')
      .getMany();
    return article;
  }
  /**
   *
   * 获取文章
   * @param {string} aid
   * @param {string} userId
   * @returns
   * @memberof ArticleService
   */
  async getArtile(aid: string, userId: string) {
    const article: Article = await this.repository.findOne({
      where: {
        id: aid,
      },
    });
    if (!article || (article.status === 'draft' && article.userId !== userId)) {
      throw new ApiException('文章不存在', ApiErrorCode.DATA_NO_EXIT);
    } else {
      return article;
    }
  }
  /**
   *
   * 删除文章
   * @param {string} aid
   * @param {string} userId
   * @memberof ArticleService
   */
  async deleteArticle(aid: string, userId: string) {
    const article: Article = await this.repository.findOne({
      where: {
        id: aid,
      },
    });
    if (!article) {
      throw new ApiException('文章不存在', ApiErrorCode.DATA_NO_EXIT);
    } else if (article.userId !== userId) {
      throw new ApiException('没有权限删除文章', ApiErrorCode.NO_AUTHORIZATION);
    } else {
      const res = await this.repository.delete({ id: aid });
      if (res.affected === 1) {
        return {
          msg: '删除成功',
        };
      } else {
        return {
          msg: '删除失败',
        };
      }
    }
  }
}
