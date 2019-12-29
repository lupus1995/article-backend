import {MigrationInterface, QueryRunner, TableForeignKey, TableIndex} from 'typeorm';

const article: string = 'articles';
const index: string = 'idx_articles_author_id';
const fk = 'fk_articles_author_id';

export class addFkArticleUser1577644036045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createIndex(article, new TableIndex({
            name: index,
            columnNames: ['author_id'],
        }));

        await queryRunner.createForeignKey(article, new TableForeignKey({
            columnNames: ['author_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            name: fk,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey(article, fk);
        await queryRunner.dropIndex(article, index);
    }

}
