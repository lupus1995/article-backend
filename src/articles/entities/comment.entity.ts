import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Article} from './article.entity';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({name: 'article_id'})
    articleId: number;

    @Column({length: 255})
    comment: string;

    @Column({name: 'created_at'})
    createdAd: string;

    @OneToOne(type => Article, article => article.id)
    article?: Article;
}
