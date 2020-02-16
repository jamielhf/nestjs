
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ArticleModule,
  ],
  providers:[
  ],
  exports:[
    UsersModule,
    AuthModule,
    ArticleModule,
  ]
})
export class FeatureModule {}
