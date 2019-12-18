
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100,default:'' })
  nickName: string;

  @Column({length:200,default:''})
  decs: string;

  @Column({type:'int',default:0})
  fansNum: number;

  @Column({type:'int',default:0})
  focusNum: number;

  @Column({length:1000,default:'https://huyaimg.msstatic.com/avatar/1076/7e/e1d48955f39a25fb944f4dedb3ed16_180_135.jpg'})
  avatar: string

  @Column({length:50,default:'user'})
  type: string

  @Column({length:50})
  password: string

  @Column({length:50})
  email:string

  @Column({length:50,default:''})
  githubId:string

  @Column({length:50,default:''})
  githubUsername:string

  @Column({length:50,default:''})
  githubAccessToken:string

  @CreateDateColumn({})
  createTime:Date

  @UpdateDateColumn({})
  updateTime:Date
}
