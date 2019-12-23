/*
 * @Author: your name
 * @Date: 2019-12-02 15:03:49
 * @LastEditTime: 2019-12-23 17:08:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\feature\feature.module.ts
 */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ArticleModule,
  ],
  exports:[
    UsersModule,
    AuthModule,
    ArticleModule,
  ]
})
export class FeatureModule {}
