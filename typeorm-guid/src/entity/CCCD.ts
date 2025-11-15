import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class CCCD {
  @PrimaryGeneratedColumn({
    comment: 'id of cccd',
  })
  id: Number

  @Column({
    comment: 'number of cccd',
    length: 14,
  })
  cccd_no: String

  @JoinColumn()
  @OneToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User
}
