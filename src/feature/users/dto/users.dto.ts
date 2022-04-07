import {
  IsString,
  IsIn,
  IsInt,
  Matches,
  IsEmail,
  IsNotEmpty,
  NotEquals,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class UserInfoDto {
  @IsNotEmpty({
    message: '用户id不能为空',
  })
  readonly userId: string;
}

export class UpdateUserInfoDto {
  @IsNotEmpty({
    message: '更新内容不能为空',
  })
  @IsIn(['nickName', 'decs', 'avatar'], {
    message: '更新信息有误',
  })
  readonly field: string;
  @IsNotEmpty({
    message: '值不能为空',
  })
  readonly value: string;
}
export class FollerDto {
  @IsNotEmpty({
    message: '关注的用户id不能为空',
  })
  readonly followUserId: string;
  @IsNotEmpty({
    message: '关注的状态不能为空',
  })
  readonly status: 0 | 1;
}

export class TagIdDto {
  @IsNotEmpty({
    message: '标签id不能为空',
  })
  readonly id: string;
  @IsNotEmpty({
    message: '关注的状态不能为空',
  })
  readonly status: string;
}
