
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable
} from 'typeorm';
import { Article } from '../article/article.entity';
import { Category } from '../category/category.entity';
import { Exclude } from 'class-transformer';

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
    article => article.tags,
  )
  articles: Array<Article>;

  @ManyToOne(
    () => Category,
    category => category.tags,
    { cascade: true }
  )
  @JoinTable()
  category: Category;

  @Exclude()
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_time'
  })
  createTime: Date

  @Exclude()
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_time'
  })
  updateTime: Date

  constructor(partial: Partial<Tag>) {
    Object.assign(this, partial);
  }
}
