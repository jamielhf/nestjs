
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany
} from 'typeorm';
import { Article } from '../article/article.entity';
import { Tag } from '../tag/tag.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'Categorys名' })
  title: string;

  @Column({
    type: 'text'
  })
  icon: string;

  @OneToMany(
    () => Article,
    article => article.category
  )
  articles: Array<Article>;

  @OneToMany(
    () => Tag,
    tag => tag.category
  )
  tags: Array<Tag>;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_time'
  })
  createTime: Date

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_time'
  })
  updateTime: Date
}
