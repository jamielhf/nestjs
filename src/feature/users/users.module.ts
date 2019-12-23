/*
 * @Author: your name
 * @Date: 2019-12-02 15:03:49
 * @LastEditTime : 2019-12-23 17:38:49
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\feature\users\users.module.ts
 */

import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { CommonModule } from '../../common/common.module';
@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Users]),
    PassportModule, // 默认策略，之后在装饰器中使用就不需要传递
    JwtModule.register({
        secret: jwtConstants.secret, // 设置secret
        signOptions: { expiresIn: '3600' }, // 设置token的属性，时间为3600*10就是十小时,其余配置可以看jwt的一些相关配置
    }),
  ],
  controllers:[
    UserController
  ],
  providers:[
    UsersService,
  ],
  exports:[
    UsersService,
  ]
})
export class UsersModule {}
