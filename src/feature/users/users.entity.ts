/*
 * @Author: your name
 * @Date: 2019-12-02 15:03:49
 * @LastEditTime : 2019-12-24 16:52:48
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\feature\users\users.entity.ts
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({length:50,default:''})
  github_accesstoken:string

  @CreateDateColumn({})
  create_time:Date

  @UpdateDateColumn({})
  update_time:Date
}
