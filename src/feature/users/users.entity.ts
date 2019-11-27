import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
  nick_name: string;

  @Column({length:200})
  decs: string;

  @Column('int')
  fans_num: number;

  @Column('int')
  focus_num: number;

  @Column('text')
  avatar: string

  @Column({length:50})
  type: string

  @Column({length:50})
  password: string
}