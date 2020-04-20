import { Controller, Get, Post } from '@nestjs/common';

@Controller('tag')
export class TagController {

  // 保存tag
  @Post('save')
  saveTag(){

  }
  // 更新tag
  @Post('update')
  updateTag(){

  }

  // 获取tag列表
  @Get('list')
  getTagList(){

  }

}
