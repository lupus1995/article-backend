import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Comments} from './comment.entity';

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    article: string;

    @Column()
    description: string;

    @Column({name: 'author_id'})
    authorId: number;

    @Column({name: 'created_at'})
    createdAd?: string;

    @Column({name: 'updated_at'})
    updatedAt?: string;

    // @OneToMany(type => Comments, comment => comment.articleId)
    // @JoinColumn()
    // comments?: Comments[];
}
