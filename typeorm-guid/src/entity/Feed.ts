import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Feed {
    @PrimaryGeneratedColumn()
    id: Number
    
    @Column({
        length: 255,
    })
    feed_name: String


    @ManyToOne(() => User, {
        cascade: true,
        //khi mà feed được xây thị nó sẽ tự tạo cho thằng user
    })
    user: User
    //K cần khóa ngoại hay join column vì manytoone tự hiểu là khóa ngoại
}
