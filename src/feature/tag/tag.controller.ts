import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { TagService } from './tag.services';
import { TagSaveDto, TagIdDto, TagUpdateDto } from './dto/tag.dto';
import { Tag } from './tag.entity';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/tag')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ) {

  }
  // 保存tag
  @Post('save')
  async saveTag(@Body() body: TagSaveDto) {
    return await this.tagService.save(body);
  }
  // 更新tag
  @Post('update')
  async updateTag(@Body() body: TagUpdateDto) {
    let { id, ...data } = body;
    return await this.tagService.update({
      id,
    }, data);
  }
  // 删除tag
  @Post('delete')
  async deleteTag(@Body() body: TagIdDto) {
    return await this.tagService.delete({ id: body.id });
  }

  // 获取tag列表
  @Get('list')
  async getTagList(@Query('id') id?: string): Promise<Tag[]> {
    return await this.tagService.list(id);

  }

}
