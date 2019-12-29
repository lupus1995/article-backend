import {Injectable} from '@nestjs/common';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    GHOST = 'ghost',
}

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.ADMIN,
    })
    role: UserRole;

    @Column({name: 'created_at'})
    createdAt: string;

    @Column({name: 'updated_at'})
    updatedAt: string;
}
