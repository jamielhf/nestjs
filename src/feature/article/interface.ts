export interface createBody {
  content?: string;
  title?: string;
  userId?: string;
}
export interface IListquery {
  tagId?: string;
  categoryId?: string;
  userId?: string;
}

export type IType = 'tagId' | 'categoryId' | 'userId'