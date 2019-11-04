import { Controller, Get, Param, Res,HttpStatus,UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import {AuthGuard} from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  @UseGuards(AuthGuard())
  async getHello(@Param() params,@Res() res: Response) {
    console.log(params.id);
    const data = await this.userService.findAll();
    res.status(HttpStatus.OK).json(data);
  }
}
