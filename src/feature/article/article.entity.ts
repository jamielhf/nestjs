import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';
import { Users } from '../users/users.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  markdown: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  html: string;

  @Column({
    length: 100,
    nullable: true,
  })
  title: string;

  @ManyToMany(() => Users, user => user.articleFoller, { cascade: true })
  @JoinTable()
  user: Users[];

  @ManyToOne(() => Tag, tag => tag.articles, { cascade: true })
  @JoinTable()
  tag: Tag;

  @ManyToOne(
    () => Category,
    category => category.articles,
    { cascade: true }, // 自动保存关系着的对象
  )
  @JoinTable()
  category: Category;

  @Column({
    type: 'text',
  })
  userId: string;

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string; // 文章状态

  @Column({ type: 'int', default: 0 })
  views: number; // 阅读量

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  publishAt: Date; // 发布日期

  @Exclude()
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  updateTime: Date;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
