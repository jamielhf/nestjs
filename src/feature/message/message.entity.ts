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
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;
  @Column({
    type: 'text',
  })
  userId: string;
  @OneToOne(type => Users)
  @JoinColumn()
  user: Users;
  @OneToOne(type => Users)
  @JoinColumn()
  receiver: Users;
  @Column({
    type: 'text',
  })
  receiverId: string;
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
