import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  Get,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Response,
  Body,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInfoDto, FollerDto, UpdateUserInfoDto } from './dto/users.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  /**
   *
   * 获取登录用户的信息
   * @param {*} req
   * @returns
   * @memberof UserController
   */

  @Get('info')
  async getInfo(@Body() body, @Req() req) {
    let userId = body.userId || req.user.id;
    if (userId) {
      const user = await this.userService.findOne({
        id: userId,
      });
      return user;
    }
  }
  /**
   *
   * 关注
   * @param {*} req
   * @returns
   * @memberof UserController
   */

  @Post('follow')
  async follow(@Body() body: FollerDto, @Req() req) {
    const res = await this.userService.follower(
      req.user.id,
      body.followUserId,
      body.status,
    );
    return res;
  }
  /**
   *
   * 更新用户信息 更新单项
   * @param {UpdateUserInfoDto} body
   * @param {*} req
   * @memberof UserController
   */
  @Post('updateUserInfo')
  async updateUserInfo(@Body() body: UpdateUserInfoDto, @Req() req) {
    return await this.userService.updateUserInfo(body, req.user.id);
  }
}
