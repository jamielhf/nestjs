import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from '../core/core.module';
import { TagController } from './tag/tag.controller';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { ViewModule } from './view/view.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    MessageModule,
    AuthModule,
    ArticleModule,
    TagModule,
    CategoryModule,
    ViewModule,
  ],
  providers: [],
  exports: [UsersModule, AuthModule, ViewModule],
})
export class FeatureModule {}
