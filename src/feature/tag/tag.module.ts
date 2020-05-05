import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { TagService } from './tag.services';
import { Tag } from './tag.entity';
import { CategoryModule } from '../category/category.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    CategoryModule,
  ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule { }
