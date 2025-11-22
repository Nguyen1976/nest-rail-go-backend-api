import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Permission } from './permission.entity'

@Entity({
  name: 'jwt_role',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50,
  })
  name: string

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'jwt_role_permission',
  })
  permissions: Permission[]
}
