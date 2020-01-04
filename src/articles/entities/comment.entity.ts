import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Article} from './article.entity';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    articleId: number;

    @Column({length: 255})
    comment: string;

    @Column({name: 'created_at'})
    createdAd: string;

    @ManyToOne(type => Article, article => article.comments)
    article: Article;
}
