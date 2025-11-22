import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { Permission } from "./permission.entity";


@Entity({
    name: 'role'
})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50, // Increased length for more descriptive role names
        unique: true,
        comment: 'The unique name of the role (e.g., "Admin", "Moderator").'
    })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'role_permissions', // The name of the pivot table
        joinColumn: { name: 'role_id' },
        inverseJoinColumn: { name: 'permission_id' }
    })
    permissions: Permission[];
}