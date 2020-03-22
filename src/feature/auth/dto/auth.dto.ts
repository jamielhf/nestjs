import { IsString, IsInt,Matches, IsEmail,IsNotEmpty,NotEquals } from 'class-validator';
import {Transform} from 'class-transformer';
import { IsEqualsThan } from '../../../core/decorators/validator.decorators';
export class LoginDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Matches(/^[a-zA-Z0-9\-_]{5,20}$/i, {
    message: '用户名不合法',
  })
  readonly username: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  readonly password: string;
}

export class ResgisterDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Matches(/^[a-zA-Z0-9\-_]{5,20}$/i, {
    message: '用户名不合法',
  })
  readonly username: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  readonly password: string;
  @IsNotEmpty({
    message: '确认密码不能为空',
  })
  @IsEqualsThan('password', {
    message: '两次密码输入不一致。',
  })
  readonly rePwd: string;
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail({}, {
    message: '邮箱不合法',
  })
  readonly email: string;
}
export class SetPasswordDto {
  @IsNotEmpty({
    message: '密码不能为空',
  })
  readonly password: string;
  @IsNotEmpty({
    message: '确认密码不能为空',
  })
  @IsEqualsThan('password', {
    message: '两次密码输入不一致。',
  })
  readonly rePwd: string;
  @IsNotEmpty({
    message: 'token不能为空',
  })
  readonly token: string;
}
export class ForgetPasswordDto {
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail({}, {
    message: '邮箱不合法',
  })
  readonly email: string
}

export class ResetPwdDto {
  @IsNotEmpty({
    message: '密码不能为空',
  })
  readonly oldPwd
  @IsNotEmpty({
    message: '密码不能为空',
  })
  readonly password: string;
  @IsNotEmpty({
    message: '确认密码不能为空',
  })
  @IsEqualsThan('password', {
    message: '两次密码输入不一致。',
  })
  readonly rePwd: string;
}

export class ActiveRegisterDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Matches(/^[a-zA-Z0-9\-_]{5,20}$/i, {
    message: '用户名不合法',
  })
  readonly username: string;
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  readonly key: string;
}