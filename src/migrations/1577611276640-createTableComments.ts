import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createTableComments1577611276640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'comments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'article_id',
                    type: 'int',
                },
                {
                    name: 'comment',
                    type: 'varchar',
                },
                {
                    type: 'datetime',
                    name: 'created_at',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('comments');
    }

}
