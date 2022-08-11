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
import { apiMsg } from '../../common/util';

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
  async list(
    type: IType,
    id: string,
    page = 1,
    pageSize = 20,
    userId = '',
  ): Promise<Article[]> {
    if (page < 1 || pageSize < 1) {
      throw new ApiException('页数错误', ApiErrorCode.PARAM_ERROR);
    }

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
      let list: Article[];
      const data: (Article & {
        collect: {
          isCollect: boolean;
        };
      })[] = [];
      const query = this.repository.createQueryBuilder('article');

      if (type === 'follow') {
        query.where('article.status = :status', {
          status: 'publish',
        });
      } else if (type === 'self') {
        query.where('article.userId = :userId', { userId: id });
      } else {
        query
          .where('article.status = :status', { status: 'publish' })
          .andWhere(`article.${type} = :${type}`, { [type]: id });
      }
      list = await query
        .orderBy('article.publishAt', 'DESC')
        .leftJoinAndSelect('article.user', 'user', 'user.id = :id', {
          id: userId,
        })
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getMany();
      list.map(item => {
        const isCollect = item.user.length > 0;
        delete item.user;
        delete item.html;
        delete item.markdown;
        item.content = item.content ? item.content.substring(0, 100) : '';
        data.push({
          ...item,
          collect: {
            isCollect,
          },
        });
      });

      return data;
    } catch (e) {
      console.log(e);
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
  async create(id, data: Partial<Article>): Promise<Article> {
    console.log(data);
    try {
      const newArticle = await this.repository.create({
        userId: id,
        status: 'draft',
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
   * 获取文章
   * @param {string} aid
   * @param {string} userId
   * @returns
   * @memberof ArticleService
   */
  async getArtile(
    aid: string,
    userId?: string,
    type: 'other' | 'self' = 'other',
  ) {
    console.log('article', 222);
    const query = this.repository
      .createQueryBuilder('article')
      .where('article.id = :aid', { aid })
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tag', 'tag');
    console.log('article', 1);
    if (userId) {
      query.leftJoinAndSelect('article.user', 'user', 'user.id = :id', {
        id: userId,
      });
    }
    console.log('article', 2);

    if (type === 'other') {
      query.andWhere('article.status = :status', { status: 'publish' });
    }

    const article: Article = await query.getOne();
    console.log('article', article);
    if (!article || (type === 'self' && article.userId !== userId)) {
      throw new ApiException('文章不存在', ApiErrorCode.DATA_NO_EXIT);
    } else {
      const isCollect = article.user.length > 0;
      delete article.user;
      return {
        ...article,
        collect: {
          isCollect,
        },
      };
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
  /**
   * 获取所有文章
   * @param page
   * @param pageSize
   * @param userId
   * @param keyword
   * @returns
   */
  async getAllArticle({ page = 1, pageSize = 20, userId = '', keyword = '' }) {
    if (page < 1 || pageSize < 1) {
      throw new ApiException('页数错误', ApiErrorCode.PARAM_ERROR);
    }
    const query = this.repository
      .createQueryBuilder('article')
      .where('article.status = :status', { status: 'publish' })
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.user', 'user', 'user.id = :id', {
        id: userId,
      })
      .leftJoinAndSelect('article.tag', 'tag')
      .orderBy('article.publishAt', 'DESC');
    if (keyword) {
      query.where('article.content LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const res = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
    res.forEach(item => {
      item.content = item.content ? item.content.substring(0, 100) : '';
      delete item.html;
      delete item.markdown;
    });
    return res;
  }
  /**
   * 关注文章
   * @param param0
   * @param userId
   * @returns
   */
  async followArticle({ id, status }, userId) {
    const article = await this.repository
      .createQueryBuilder('article')
      .where('article.status = :status', { status: 'publish' })
      .andWhere('article.id = :id', { id })
      .leftJoinAndSelect('article.user', 'user')
      .getOne();

    if (!article) {
      apiMsg('文章不存在', ApiErrorCode.DATA_NO_EXIT);
    }
    const user = await this.usersService.repository.findOne({
      where: {
        id: userId,
      },
    });
    if (+status === 0) {
      article.user = article.user.filter(item => item.id !== userId);
    } else {
      if (!article.user.find(item => item.id === userId)) {
        article.user.push(user);
      }
    }
    const res = await this.repository.save(article);
    if (res) {
      return {
        msg: '成功',
      };
    }
    apiMsg('更新失败', ApiErrorCode.TIMEOUT);
  }
}
