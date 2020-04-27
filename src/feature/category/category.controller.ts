import { Controller, Post, Get, Body, Req, UseInterceptors, ClassSerializerInterceptor, Next, Query } from '@nestjs/common';
import { CategorySaveDto, CategoryIdDto } from './dto/category.dto';
import { CategoryService } from './category.service';

@Controller('api/category')
export class CategoryController {
   constructor(
      private readonly categoryService: CategoryService,
   ) { }
   // 保存分类
   @Post('save')
   async saveCategory(@Body() body: CategorySaveDto) {
      return await this.categoryService.save(body)
   }
   // 更新分类
   @Post('update')
   async updateCategory(@Body('id') body: CategoryIdDto) {
      return await this.categoryService.update(body.id);
   }
   // 删除分类
   @Post('delete')
   async deleteCategory(@Body() body: CategoryIdDto) {
      return await this.categoryService.delete(body.id);
   }

   // 获取分类列表
   @Get('list')
   async getCategoryList(@Query('id') id?: string) {
      return await this.categoryService.list(id);
   }

}
