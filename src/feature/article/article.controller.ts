import { Controller, Get, Post, Body, Res, Req, UseGuards, Query, Delete, Param, Put } from '@nestjs/common';
import { createBody } from './interface';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { updateBody } from './dto/article.dto';
import { Response, Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/article')
export class ArticleController {
  constructor(readonly articleServive: ArticleService) {

  }
  // 获取标签文章列表
  @Get('tag/:id')
  async getArticleListByTag(@Param('id') id) {
    return await this.articleServive.list('tagId', id);
  }
  // 获取分类文章列表
  @Get('category/:id')
  async getArticleListByCategory(@Param('id') id) {
    return await this.articleServive.list('categoryId', id);
  }
  // 获取某个用户文章列表
  @Get('user/:id')
  async getArticleListByUser(@Param('id') id) {
    return await this.articleServive.list('userId', id);
  }
  // 获取自己的文章列表
  @Get('user')
  async getArticleListByUserSelf(@Req() req) {
    return await this.articleServive.userArticle(req.user.id)
  }
  // 获取某篇文章
  @Get(':id')
  async getArticleDetail(@Param('id') id, @Req() req) {
    return await this.articleServive.getArtile(id, req.user.id)
  }
  // 获取文章详情
  @Get()
  async getAllArticle(@Res() res: Response) {
    return await this.articleServive.find({
      where: {
        status: 'publish'
      }
    });
  }
  // 创建文章
  @Post()
  async createArticle(@Body() body: createBody, @Req() req) {

    body.userId = req.user.id;
    return await this.articleServive.create(body);
  }
  // 更新文章
  @Put(':id')
  async updateArticle(@Param('id') id, @Body() body: updateBody, @Req() req) {
    return await this.articleServive.updateArticle(id, body, req.user.id);
  }
  // 删除文章
  @Delete(':id')
  async deleteArticle(@Param('id') id, @Req() req) {
    return await this.articleServive.deleteArticle(id, req.user.id)
  }
}
