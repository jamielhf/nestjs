import { IsNotEmpty } from "class-validator";

export class ArticleSaveDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  readonly title: string;
  readonly content: string;
  
}