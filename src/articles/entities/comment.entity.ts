import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ArticleEntity} from './article.entity';

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    articleId: number;

    @Column({length: 255})
    comment: string;

    @Column({name: 'created_at'})
    createdAd: string;

    @ManyToOne(type => ArticleEntity, article => article.comments)
    article: ArticleEntity;
}
