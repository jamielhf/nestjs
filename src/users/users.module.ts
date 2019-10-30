import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers:[
    UserController
  ],
  providers:[
    UsersService
  ]
})
export class UsersModule {}
