import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Relations } from './relations.entity';
import { CommonModule } from '../../common/common.module';
@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Users, Relations]),
    PassportModule, // 默认策略，之后在装饰器中使用就不需要传递
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
