import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    GHOST = 'ghost',
}

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    password: string;

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
