import { IsNotEmpty } from 'class-validator';
export class TagSaveDto {
  @IsNotEmpty({
    message: '标签名不能为空',
  })
  readonly title: string;
  @IsNotEmpty({
    message: '图片不能为空',
  })
  readonly icon: string;
  @IsNotEmpty({
    message: '分类id不能为空',
  })
  readonly category: string;
}

export class TagIdDto {
  @IsNotEmpty({
    message: '标签id不能为空',
  })
  readonly id: string;
}

export class TagUpdateDto {
  icon?: string;
  title?: string;
  category?: string;
}
