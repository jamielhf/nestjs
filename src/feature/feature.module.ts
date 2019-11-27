import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ArticleModule
  ],
})
export class FeatureModule {}
