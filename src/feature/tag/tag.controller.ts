import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Put,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.services';
import { TagSaveDto, TagIdDto, TagUpdateDto } from './dto/tag.dto';
import { Tag } from './tag.entity';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  // 保存tag
  @Post()
  async saveTag(@Body() body: TagSaveDto) {
    return await this.tagService.save(body);
  }
  // 更新tag
  @Put(':id')
  async updateTag(@Param('id') id, @Body() body: Partial<TagUpdateDto>) {
    let { ...data } = body;
    const update: Partial<TagUpdateDto> = {};

    for (let key in data) {
      if (data[key]) {
        update[key] = data[key];
      }
    }
    return await this.tagService.updateTag(id, update);
  }
  // 删除tag
  @Delete(':id')
  async deleteTag(@Param('id') id) {
    return await this.tagService.delete({ id });
  }

  // 获取tag列表
  @Get()
  async getTagList() {
    return await this.tagService.list();
  }
  // 获取单个tag
  @Get(':id')
  async getTag(@Param('id') id?: string) {
    return await this.tagService.list(id);
  }
}
