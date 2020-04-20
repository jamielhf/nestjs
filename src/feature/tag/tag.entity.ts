
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToMany, 
  ManyToOne,
  OneToMany} from 'typeorm';
  import { Article } from '../article/article.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'tag名' })
  title: string;

  @Column()
  icon: string;

  @OneToMany(
    () => Article,
    article => article.tags
  )
  articles: Article;

  @ManyToOne(
    () => Category,
    category => category.tags,
  )
  category: Category;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  create_time:Date

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  update_time:Date
}
