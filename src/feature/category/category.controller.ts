import { Controller, Post, Get, Body, Req, UseInterceptors, ClassSerializerInterceptor, Next, Query } from '@nestjs/common';
import { CategorySaveDto, CategoryIdDto, CategoryUpdateDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
@UseInterceptors(ClassSerializerInterceptor)
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
   async updateCategory(@Body() body: CategoryUpdateDto) {
      let { id, ...data } = body;
      return await this.categoryService.update({
         id,
      }, data);
   }
   // 删除分类
   @Post('delete')
   async deleteCategory(@Body() body: CategoryIdDto) {
      return await this.categoryService.delete({ id: body.id });
   }

   // 获取分类列表
   @Get('list')
   async getCategoryList(@Query('id') id?: string): Promise<Category[]> {
      return await this.categoryService.list(id);
   }

}
