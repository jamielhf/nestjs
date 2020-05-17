import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { createBody } from './interface';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/article')
export class ArticleController {
  constructor(readonly articleServive: ArticleService) {

  }
  // 获取文章列表
  @Get('list')
  getArticleList() {
    return {
      a: 1
    }
  }
  // 获取文章详情
  @Get('detail')
  getArticleDetail() {

  }
  // 创建文章
  @Post('create')
  async createArticle(@Body() body: createBody, @Req() req) {

    body.userId = req.user.id;
    return await this.articleServive.create(body);
  }
  // 保存文章
  @Post('update')
  updateArticle(@Body() body) {

  }
  // 发布文章
  @Post('publish')
  publishArticle() {

  }
  // 删除文章
  @Post('delete')
  deleteArticle() {

  }
}
