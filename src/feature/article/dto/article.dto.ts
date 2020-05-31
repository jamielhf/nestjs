import { IsNotEmpty, ValidateIf, IsIn } from "class-validator";



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
    message: '标题不能为空'
  })
  readonly title: string;
  @ValidateIf(obj => {
    return obj && typeof obj.tagId !== 'undefined';
  })
  @IsNotEmpty({
    message: '标签id不能为空'
  })
  readonly tagId: string;
  @ValidateIf(obj => {
    return obj && typeof obj.categoryId !== 'undefined';
  })
  @IsNotEmpty({
    message: '分类id不能为空'
  })
  readonly categoryId: string;
  @IsNotEmpty({
    message: '状态不能为空'
  })
  @ValidateIf(obj => {
    return obj && typeof obj.status !== 'undefined';
  })
  @IsIn([
    'publish',
    'draft',
  ], {
    message: '更新文章状态有误',
  })
  readonly status: string
}