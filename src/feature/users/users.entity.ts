
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100,default:'' })
  nick_name: string;

  @Column({length:200,default:''})
  decs: string;

  @Column({type:'int',default:0})
  fans_num: number;

  @Column({type:'int',default:0})
  focus_num: number;

  @Column({
   type:'text',
  })
  avatar: string

  @Column({length:50,default:'user'})
  type: string

  @Exclude()
  @Column({length:50})
  password: string

  @Column({length:50})
  email:string

  @Column({type:'int',default:0})
  active: number

  @Column({length:50,default:''})
  github_id:string

  @Column({length:50,default:''})
  github_username:string

  @Exclude()
  @Column({length:50,default:''})
  github_accesstoken:string

  @Exclude()
  @CreateDateColumn({})
  create_time:Date

  @Exclude()
  @UpdateDateColumn({})
  update_time:Date
}
