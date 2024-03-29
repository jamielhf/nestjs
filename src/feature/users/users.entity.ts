import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from '../article/article.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100, default: '', name: 'nick_name' })
  nickName: string;

  @Column({ length: 200, default: '', comment: '个人介绍' })
  decs: string;

  @Column({
    type: 'text',
  })
  avatar: string;

  @Exclude()
  @Column('simple-enum', { enum: ['admin', 'visitor'], default: 'visitor' })
  role: string; // 用户角色

  @Exclude()
  @Column({ length: 50 })
  password: string;

  @Column({ length: 50 })
  email: string;

  @Column('simple-enum', { enum: [1, 0], default: 0 })
  active: number;

  @Column({ length: 50, default: '', name: 'github_id' })
  githubId: string;

  @Exclude()
  @Column({ length: 50, default: '', name: 'github_accesstoken' })
  githubAccesstoken: string;

  @ManyToMany(() => Tag, tag => tag.user, { cascade: true })
  @JoinTable()
  tag: Tag[];

  @ManyToMany(() => Article, article => article.user)
  articleFoller: Article[];

  @Exclude()
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_time',
  })
  createTime: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_time',
  })
  updateTime: Date;

  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }
}
