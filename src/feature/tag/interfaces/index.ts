import { ICategory } from "src/feature/category/interfaces";
import { Category } from "src/feature/category/category.entity";

export interface ITags {
  id: string,
  title: string,
  icon: string,
  createTime: string,
  updateTime: string,
  category: Category
}