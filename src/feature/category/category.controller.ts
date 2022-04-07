import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Next,
  Query,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  CategorySaveDto,
  CategoryIdDto,
  CategoryUpdateDto,
} from './dto/category.dto';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport';
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  // 保存分类
  @Post()
  async saveCategory(@Body() body: CategorySaveDto) {
    return await this.categoryService.save(body);
  }
  // 更新分类
  @Put(':id')
  async updateCategory(
    @Param('id') id,
    @Body() body: Partial<CategoryUpdateDto>,
  ) {
    let { ...data } = body;
    const update: any = {};
    if (data.title) {
      update.title = data.title;
    }
    if (data.icon) {
      update.icon = data.icon;
    }

    return await this.categoryService.update(
      {
        id,
      },
      update,
    );
  }
  // 删除分类
  @Delete(':id')
  async deleteCategory(@Param('id') id) {
    return await this.categoryService.delete({ id });
  }

  // 获取分类列表
  @Get()
  async getCategoryList() {
    return await this.categoryService.list();
  }
  // 获取分类
  @Get(':id')
  async getCategory(@Param('id') id?: string) {
    return await this.categoryService.list(id);
  }
}
