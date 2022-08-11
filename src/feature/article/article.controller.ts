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
import {
  createBodyDto,
  IdDto,
  pageDto,
  searchDto,
  updateBody,
} from './dto/article.dto';
import { Response, Request } from 'express';

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
      (req.user && req.user.id) || '',
    );
  }
  // 获取关注文章列表
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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

  // 获取自己的某篇文章
  @UseGuards(AuthGuard('jwt'))
  @Get('self/:id')
  async getArticleDetail(@Param('id') id, @Req() req) {
    return await this.articleServive.getArtile(id, req.user.id, 'self');
  }
  // 搜索文章
  @Get('search')
  async search(@Body() body: searchDto, @Req() req) {
    return await this.articleServive.getAllArticle({
      page: body.page || 1,
      pageSize: body.pageSize || 20,
      keyword: body.keyword || '',
      userId: (req.user && req.user.id) || '',
    });
  }
  // 获取某篇文章
  @Get('detail/:id')
  async getArticle(@Param('id') id, @Req() req) {
    return await this.articleServive.getArtile(
      id,
      (req.user && req.user.id) || '',
    );
  }
  // 获取所有文章
  @Get()
  async getAllArticle(@Body() body: pageDto, @Req() req) {
    return await this.articleServive.getAllArticle({
      page: body.page,
      pageSize: body.pageSize,
      userId: (req.user && req.user.id) || '',
    });
  }

  // 创建文章
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createArticle(@Body() body: createBodyDto, @Req() req) {
    console.log('body', body);
    return await this.articleServive.create(req.user.id, body);
  }
  // 更新文章
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateArticle(@Param('id') id, @Body() body: updateBody, @Req() req) {
    return await this.articleServive.updateArticle(id, body, req.user.id);
  }
  // 删除文章
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteArticle(@Param('id') id, @Req() req) {
    return await this.articleServive.deleteArticle(id, req.user.id);
  }
  // 关注文章
  @UseGuards(AuthGuard('jwt'))
  @Post('followArticle')
  async followArticle(@Body() body: IdDto, @Req() req) {
    return await this.articleServive.followArticle(body, req.user.id);
  }
}
