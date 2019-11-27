import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    ArticleModule
  ],
  exports:[
    UsersModule,
    ArticleModule
  ]
})
export class FeatureModule {}
