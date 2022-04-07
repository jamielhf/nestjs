import { BaseService } from '../../common/mysql/base.service';
import { Injectable } from '@nestjs/common';
import { TagSaveDto, TagUpdateDto } from './dto/tag.dto';
import { Tag } from './tag.entity';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';
import { CategoryService } from '../category/category.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';

@Injectable()
export class TagService extends BaseService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly categoryService: CategoryService,
  ) {
    super();
  }
  repository: Repository<Tag> = this.tagRepository;
  /**
   *
   * 保存标签
   * @param {TagSaveDto} data
   * @returns {Promise<Tag>}
   * @memberof TagService
   */
  async save(data: TagSaveDto): Promise<Tag> {
    const hasCategory = await this.categoryService.findOne<Category>({
      id: data.category,
    });
    if (!hasCategory) {
      throw new ApiException('分类不存在', ApiErrorCode.DATA_NO_EXIT);
    }
    const hasItem = await this.repository.findOne({ title: data.title });
    if (!hasItem) {
      let tag: Tag = new Tag({
        ...data,
        category: hasCategory,
      });
      const res = await this.repository.save(tag);
      if (res) {
        return res;
      } else {
        throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
      }
    } else {
      throw new ApiException('标签已存在', ApiErrorCode.CREATE_FAIL);
    }
  }

  /**
   * 更新标签
   * @param id
   * @param data
   * @returns
   */
  async updateTag(id, data) {
    if (data.category) {
      const hasCategory = await this.categoryService.findOne<Category>({
        id: data.category,
      });
      data.category = hasCategory;
      if (!hasCategory) {
        throw new ApiException('分类不存在', ApiErrorCode.DATA_NO_EXIT);
      }
    }
    const res = await this.repository.update(
      {
        id,
      },
      data,
    );
    if (res.raw.affectedRows === 0) {
      throw new ApiException('标签不存在', ApiErrorCode.DATA_NO_EXIT);
    }
    return {
      msg: '更新成功',
    };
  }
  /**
   *
   * 获取标签列表
   * @param {string} [id]
   * @returns {Promise<Tag[]>}
   * @memberof TagService
   */
  async list(id?: string): Promise<Tag[] | Tag> {
    if (id) {
      const res = await this.repository.findOne({
        where: {
          id,
        },
        relations: ['category'],
      });
      if (!res) {
        throw new ApiException('标签不存在', ApiErrorCode.DATA_NO_EXIT);
      }
      return res;
    } else {
      const query = await this.repository
        .createQueryBuilder('tag')
        // .leftJoinAndSelect('tag.category', 'category')
        .getMany();
      return query;
    }
  }
}
