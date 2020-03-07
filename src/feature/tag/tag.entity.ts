
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'tag名' })
  title: string;

  @Column()
  icon: string;

  @CreateDateColumn({})
  create_time:Date

  @UpdateDateColumn({})
  update_time:Date
}
