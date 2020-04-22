import { Tag } from "src/feature/tag/tag.entity";
import { Article } from "src/feature/article/article.entity";

export interface ICategory {
  articles?: Article[],
  tags?: Tag[],
  id?: string,
  title?: string,
  icon?: string,
  createTime?: Date,
  updateTime?: Date,
}