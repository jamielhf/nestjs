import { Controller, Get, Post } from '@nestjs/common';

@Controller('article')
export class ArticleController {
  // 获取文章列表
  @Get('list')
  getArticleList(){

  }
  // 获取文章详情
  @Get('detail')
  getArticleDetail(){

  }
  // 保存文章
  @Post('save')
  saveArticle(){

  }
  // 发布文章
  @Post('publish')
  publishArticle(){

  }
  // 删除文章
  @Post('delete')
  deleteArticle(){

  }
}
