import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: Number

  @Column({
    length: 100,
  })
  name: String

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[]
}
