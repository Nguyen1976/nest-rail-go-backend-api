// src/users/entities/user.entity.ts

import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { Role } from "./role.entity";

@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        unique: true,
        comment: 'The unique username for the user, used for login.'
    })
    username: string;

    @Column({
        length: 100,
        comment: 'Hashed password of the user.',
        select: false // Exclude this field from default queries for security
    })
    password: string;

    @Column({
        name: 'nickname',
        length: 50,
        comment: 'The display name of the user.'
    })
    nickname: string;

    @Column({
        length: 50,
        unique: true,
        comment: 'The unique email address of the user.'
    })
    email: string;

    @Column({
        name: 'avatar',
        length: 255,
        nullable: true,
        comment: 'URL to the user\'s profile picture.'
    })
    avatar: string;

    @Column({
        name: 'phone_number',
        length: 20,
        nullable: true,
        comment: 'The user\'s phone number.'
    })
    phoneNumber: string;

    @Column({
        name: 'is_active',
        default: true,
        comment: 'Indicates if the user account is active. Inactive users cannot log in.'
    })
    isActive: boolean;
    
    @Column({
        name: 'is_admin',
        default: false,
        comment: 'A shortcut to identify admin users without checking roles. Should be kept in sync with the Admin role.'
    })
    isAdmin: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'user_roles',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'role_id' }
    })
    roles: Role[];
}