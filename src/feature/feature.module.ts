
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from '../core/core.module';
import { TagController } from './tag/tag.controller';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AuthModule,
    ArticleModule,
    TagModule,
    CategoryModule,
    TestModule,
  ],
  providers:[
  ],
  exports:[
    UsersModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [TagController]
})
export class FeatureModule {}
