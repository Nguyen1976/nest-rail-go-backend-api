import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Tag } from './Tag'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: Number

  @Column()
  title: String

  //tên bảng trung gian
  @JoinTable({
    name: 'post_tags_001',
  })
  @ManyToMany(() => Tag, {
    cascade: true,
  })
  tags: Tag[]
}
