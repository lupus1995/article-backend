import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createTableUsers1577612235497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'surname',
                    type: 'varchar',
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: ['admin', 'user'],
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
        await queryRunner.dropTable('users');
    }

}
