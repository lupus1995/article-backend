import {Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn, RelationCount} from 'typeorm';
import {CommentEntity} from './comment.entity';

@Entity('articles')
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    article: string;

    @Column()
    description: string;

    @Column()
    slug: string;

    @Column({name: 'author_id'})
    authorId: number;

    @Column({name: 'created_at'})
    createdAd?: string;

    @Column({name: 'updated_at'})
    updatedAt?: string;

    @OneToMany(type => CommentEntity, comments => comments.article)
    @JoinTable()
    comments: CommentEntity[];

    commentsCount: number;
    articleCount: number;
    commentsTest: CommentEntity[];
}
