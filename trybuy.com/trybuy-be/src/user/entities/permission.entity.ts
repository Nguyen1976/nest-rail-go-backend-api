import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity({
    name: 'permission'
})
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100, // Increased length for more descriptive permission keys
        unique: true,
        comment: 'The unique key for the permission (e.g., "review:create", "user:delete").'
    })
    key: string; // Changed from 'code' to 'key' for clarity, 'code' is also fine.

    @Column({
        length: 255,
        comment: 'A human-readable description of what this permission allows.'
    })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}