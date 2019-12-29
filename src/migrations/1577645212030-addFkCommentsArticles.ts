import {MigrationInterface, QueryRunner, TableForeignKey, TableIndex} from 'typeorm';

const table = 'comments';
const index = 'idx_comments_article_id';
const fk = 'fk_comments_article_id';

export class addFkCommentsArticles1577645212030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createIndex(table, new TableIndex({
            name: index,
            columnNames: ['article_id'],
        }));

        await queryRunner.createForeignKey(table, new TableForeignKey({
            name: fk,
            columnNames: ['article_id'],
            referencedTableName: 'articles',
            referencedColumnNames: ['id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey(table, fk);
        await queryRunner.dropIndex(table, index);
    }

}
