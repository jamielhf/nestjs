import {
  IsNotEmpty,
  MaxLength,
  ValidateIf,
  MinLength,
  IsIn,
} from 'class-validator';

export class updateBody {
  @ValidateIf(obj => {
    return obj && typeof obj.content !== 'undefined';
  })
  readonly content: string;
  @ValidateIf(obj => {
    return obj && typeof obj.markdown !== 'undefined';
  })
  readonly markdown: string;
  @ValidateIf(obj => {
    return obj && typeof obj.html !== 'undefined';
  })
  readonly html: string;
  @ValidateIf(obj => {
    return obj && typeof obj.title !== 'undefined';
  })
  @IsNotEmpty({
    message: '标题不能为空',
  })
  readonly title: string;
  @ValidateIf(obj => {
    return obj && typeof obj.tagId !== 'undefined';
  })
  @IsNotEmpty({
    message: '标签id不能为空',
  })
  readonly tagId: string;
  @ValidateIf(obj => {
    return obj && typeof obj.categoryId !== 'undefined';
  })
  @IsNotEmpty({
    message: '分类id不能为空',
  })
  readonly categoryId: string;
  @IsNotEmpty({
    message: '状态不能为空',
  })
  @ValidateIf(obj => {
    return obj && typeof obj.status !== 'undefined';
  })
  @IsIn(['publish', 'draft'], {
    message: '更新文章状态有误',
  })
  readonly status: string;
}

export class createBodyDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @MaxLength(50, {
    message: '标题太长',
  })
  readonly title: string;
  @MinLength(0, {
    message: '内容',
  })
  readonly content?: string;
}
export class pageDto {
  @IsNotEmpty({
    message: '页数不能为空',
  })
  readonly page: number;
  readonly pageSize?: number;
}
export class IdDto {
  @IsNotEmpty({
    message: '文章id不能为空',
  })
  readonly id: number;
  @IsNotEmpty({
    message: '关注状态不能为空',
  })
  readonly status: 0 | 1;
}
