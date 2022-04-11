import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Query,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { createBody } from './interface';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { createBodyDto, IdDto, pageDto, updateBody } from './dto/article.dto';
import { Response, Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/article')
export class ArticleController {
  constructor(readonly articleServive: ArticleService) {}
  // 获取标签文章列表
  @Get('tag/:id')
  async getArticleListByTag(
    @Param('id') id,
    @Body() body: pageDto,
    @Req() req,
  ) {
    return await this.articleServive.list(
      'tagId',
      id,
      body.page,
      body.pageSize || 20,
      req.user.id,
    );
  }
  // 获取关注文章列表
  @Get('follow')
  async userFollow(@Body() body: pageDto, @Req() req) {
    return await this.articleServive.list(
      'follow',
      req.user.id,
      body.page,
      body.pageSize || 20,
      req.user.id,
    );
  }
  // 获取分类文章列表
  @Get('category/:id')
  async getArticleListByCategory(
    @Param('id') id,
    @Body() body: pageDto,
    @Req() req,
  ) {
    return await this.articleServive.list(
      'categoryId',
      id,
      body.page,
      body.pageSize || 20,
      req.user.id,
    );
  }
  // 获取某个用户文章列表
  @Get('user/:id')
  async getArticleListByUser(
    @Param('id') id,
    @Body() body: pageDto,
    @Req() req,
  ) {
    return await this.articleServive.list(
      'userId',
      id,
      body.page,
      body.pageSize || 20,
      req.user.id,
    );
  }
  // 获取自己的文章列表
  @Get('user')
  async getArticleListByUserSelf(@Req() req, @Body() body: pageDto) {
    return await this.articleServive.list(
      'self',
      req.user.id,
      body.page,
      body.pageSize || 20,
      req.user.id,
    );
  }
  // 获取某篇文章
  @Get(':id')
  async getArticle(@Param('id') id, @Req() req) {
    return await this.articleServive.getArtile(id, req.user.id);
  }
  // 获取自己的某篇文章
  @Get('self/:id')
  async getArticleDetail(@Param('id') id, @Req() req) {
    return await this.articleServive.getArtile(id, req.user.id, 'self');
  }
  // 获取所有文章
  @Get()
  async getAllArticle(@Body() body: pageDto) {
    return await this.articleServive.getAllArticle(
      body.page,
      body.pageSize || 20,
    );
  }
  // 创建文章
  @Post()
  async createArticle(@Body() body: createBodyDto, @Req() req) {
    console.log('body', body);
    return await this.articleServive.create(req.user.id, body);
  }
  // 更新文章
  @Put(':id')
  async updateArticle(@Param('id') id, @Body() body: updateBody, @Req() req) {
    return await this.articleServive.updateArticle(id, body, req.user.id);
  }
  // 删除文章
  @Delete(':id')
  async deleteArticle(@Param('id') id, @Req() req) {
    return await this.articleServive.deleteArticle(id, req.user.id);
  }
  // 关注文章
  @Post('followArticle')
  async followArticle(@Body() body: IdDto, @Req() req) {
    return await this.articleServive.followArticle(body, req.user.id);
  }
}
