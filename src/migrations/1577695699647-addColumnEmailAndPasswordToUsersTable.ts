import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class addColumnEmailAndPasswordToUsersTable1577695699647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumns('users', [
            new TableColumn({
                name: 'password',
                type: 'varchar',
                isUnique: true,
            }),

            new TableColumn({
                name: 'email',
                type: 'varchar',
                isUnique: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumns('users', [
            new TableColumn({
                name: 'email',
                type: 'string',
            }),

            new TableColumn({
                name: 'password',
                type: 'string',
            }),
        ]);
    }

}
