import { IsString, IsInt,Matches, IsEmail,IsNotEmpty,NotEquals } from 'class-validator';
import {Transform} from 'class-transformer';
export class UserInfoDto {
  @IsNotEmpty({
    message: '用户id不能为空',
  })
  readonly userId: string;
}
