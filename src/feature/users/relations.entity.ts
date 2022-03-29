import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from '../article/article.entity';

@Entity()
export class Relations {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 50, comment: '用户id' })
  uid: string;
  @Column({ length: 50, comment: '关注的人id' })
  followUserId: string;
  @Column({ type: 'integer', comment: '关注的状态 0 取消关注, 1关注' })
  status: number;

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
}
