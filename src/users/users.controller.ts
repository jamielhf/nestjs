import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import {request} from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  getHello(@Param() params): string {
    console.log(params.id);
    return `hello${params.id}`
  }
}
