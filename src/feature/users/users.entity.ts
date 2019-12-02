import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
  nickName: string;

  @Column({length:200})
  decs: string;

  @Column('int')
  fansNum: number;

  @Column('int')
  focusNum: number;

  @Column('text')
  avatar: string

  @Column({length:50})
  type: string

  @Column({length:50})
  password: string

  @Column({length:50})
  email:string

  @Column({length:50})
  githubId:string

  @Column({length:50})
  githubUsername:string

  @Column({length:50})
  githubAccessToken:string

  @CreateDateColumn({})
  createTime:Date

  @UpdateDateColumn({})
  updateTime:Date
}
