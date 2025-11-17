import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'jwt_user',
})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 50,
        unique: true, 
    })
    username: string

    @Column({
        type: 'varchar',
        length: 100,
    })
    password: string

    @Column({
        type: 'varchar',
        unique: true,
    })
    email: string

    @CreateDateColumn({
        comment: 'The date when user was created'
    })
    createdAt: Date

    @UpdateDateColumn({
        comment: 'The date when user was last updated'
    })
    updatedAt: Date
}
