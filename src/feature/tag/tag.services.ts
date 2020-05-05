import { BaseService } from "../../common/mysql/base.service";
import { Injectable } from "@nestjs/common";
import { TagSaveDto } from "./dto/tag.dto";
import { Tag } from "./tag.entity";
import { ApiException } from "../../core/exceptions/api.exception";
import { ApiErrorCode } from "../../core/enums/api-error-code.enum";
import { CategoryService } from "../category/category.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TagService extends BaseService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly categoryService: CategoryService
  ) {
    super();
    this.repository = this.tagRepository;
  }
  async save(data: TagSaveDto) {
    const hasCategory = await this.categoryService.findOne({ id: data.category });
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
        return {
          data: res
        }
      } else {
        throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
      }
    } else {
      throw new ApiException('标签已存在', ApiErrorCode.CREATE_FAIL);
    }
  }
  async list(id?: string) {
    if (id) {
      return await this.repository.find({
        where: {
          id
        }, relations: ["category"]
      });
    } else {
      const query = await this.repository
        .createQueryBuilder('tag')
        .leftJoinAndSelect('tag.category', 'category')
        .getMany();
      return query
    }
  }
}