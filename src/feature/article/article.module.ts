import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Users]),
    CategoryModule,
    TagModule,
    UsersModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
