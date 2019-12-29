import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'article_id'})
    articleId: number;

    @Column({length: 255})
    comment: string;

    @Column({name: 'created_at'})
    createdAd: Date;
}
