import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"
import { CCCD } from "./CCCD"
import { Feed } from "./Feed"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToOne(() => CCCD, (cccd) => cccd.user)
    cccd: CCCD

    @OneToMany(() => Feed, (feed) => feed.user)
    //chỉ cần set cascade ở bên manytoone vì khi feed update thì user k cần update
    feeds: Feed[]
}
