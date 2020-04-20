
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
  ManyToOne} from 'typeorm';
import {Tag} from '../tag/tag.entity'
import {Category} from '../category/category.entity'
import {Users} from '../users/users.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'text',
   })
  content: string;

  @Column({
    length: 100,
   })
  title: string

  @ManyToOne(
    () => Tag,
    tag => tag.articles,
    { cascade: true }
  )
  @JoinTable()
  tags:Tag;

  @ManyToOne(
    () => Category,
    category => category.articles,
    { cascade: true }
  )
  @JoinTable()
  category: Category;

  @OneToOne(type => Users)
  @JoinColumn()
  user: Users;

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
