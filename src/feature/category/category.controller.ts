import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { CategorySaveDto } from './dto/category.dto';
import { CategoryService } from './category.service';

@Controller('api/category')
export class CategoryController {
   constructor(
      private readonly categoryService: CategoryService,
   ) { }
   // 保存分类
   @Post('save')
   async saveCategory(@Body() body: CategorySaveDto, @Req() req) {
      return await this.categoryService.save(body)
   }
   // 更新分类
   @Post('update')
   updateCategory() {

   }

   // 获取分类列表
   @Get('list')
   getCategoryList() {
      return {
         a: 1
      }
   }

}
