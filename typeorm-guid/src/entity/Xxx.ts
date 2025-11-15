import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({
  name: 'x_001',
})
export class Xxx {
  @PrimaryGeneratedColumn({
    comment: 'id of XXX',
  })
  id: number

  @Column({
    name: 'x_1',
    type: 'text',
    comment: 'string by x1',
  })
  x1: string

  @Column({
    unique: true,
    nullable: false,
    default: 'x_2',
    type: 'varchar',
    length: 15,
  })
  x2: string

  @Column({
    type: 'double',
  })
  x3: number
}
