import { IsNotEmpty } from "class-validator";



export class updateBody {
  readonly content?: string;
  readonly markdown?: string;
  readonly html?: string;
  readonly title?: string;
  readonly tagId?: string;
  readonly categoryId?: string;
  readonly status?: 'draft' | 'publish'
}