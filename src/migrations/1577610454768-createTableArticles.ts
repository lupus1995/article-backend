import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createTableArticles1577610454768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'articles',
            columns: [
                {
                    type: 'int',
                    name: 'id',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    type: 'varchar',
                    name: 'title',
                    isUnique: true,
                    length: '255',
                },
                {
                    type: 'varchar',
                    name: 'article',
                    length: '255',
                },
                {
                    type: 'varchar',
                    name: 'description',
                    length: '255',
                },
                {
                    type: 'int',
                    name: 'author_id',
                },
                {
                    type: 'datetime',
                    name: 'created_at',
                },
                {
                    type: 'datetime',
                    name: 'updated_at',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('articles');
    }

}
