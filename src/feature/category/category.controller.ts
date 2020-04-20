import { Controller, Post, Get } from '@nestjs/common';

@Controller('category')
export class CategoryController {
   // 保存分类
   @Post('save')
   saveCategory(){
 
   }
   // 更新分类
   @Post('update')
   updateCategory(){
 
   }
 
   // 获取分类列表
   @Get('list')
   getCategoryList(){
 
   }
 
}
