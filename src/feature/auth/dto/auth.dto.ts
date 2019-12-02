import { IsString, IsInt, IsEmail } from 'class-validator';

export class LoginDto {
  readonly username: string;
  readonly password: string;
}

export class ResgisterDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly rePwd: string;
  @IsEmail()
  readonly email: string;
}