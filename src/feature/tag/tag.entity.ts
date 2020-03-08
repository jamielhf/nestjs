
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToMany } from 'typeorm';
  import { Article } from '../article/article.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'tag名' })
  title: string;

  @Column()
  icon: string;

  @ManyToMany(
    () => Article,
    article => article.tags
  )
  articles: Array<Article>;

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
