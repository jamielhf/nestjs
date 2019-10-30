import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({length:500})
  decs: string;

  @Column('int')
  fans_num: number;

  @Column('int')
  focus_num: number;

  @Column('text')
  avatar: string

  @Column({length:50})
  type: string
}
