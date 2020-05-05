import { IsNotEmpty } from "class-validator";


export class CategorySaveDto {
  @IsNotEmpty({
    message: '分类名不能为空',
  })
  readonly title: string;
  @IsNotEmpty({
    message: '图片不能为空',
  })
  readonly icon: string;
}

export class CategoryIdDto {
  @IsNotEmpty({
    message: '分类id不能为空',
  })
  readonly id: string;
}

export class CategoryUpdateDto {
  @IsNotEmpty({
    message: '分类id不能为空',
  })
  readonly id: string;
  readonly icon?: string;
  readonly title?: string;
}