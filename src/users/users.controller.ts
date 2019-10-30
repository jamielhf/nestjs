import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import {request} from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async getHello(@Param() params): Promise<string> {
    console.log(params.id);
    const data = await this.userService.findAll();
    console.log(data);
    return `hello${params.id}`
  }
}
