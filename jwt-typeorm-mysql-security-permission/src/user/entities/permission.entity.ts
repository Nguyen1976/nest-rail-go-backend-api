import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'jwt_permissions',
})
export class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, comment: 'Unique permission name' })
  name: string

  @Column({
    length: 6,
  })
  nameCode: string

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Creation time',
  })
  createdAt: Date

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Last update time',
  })
  updatedAt: Date
}
