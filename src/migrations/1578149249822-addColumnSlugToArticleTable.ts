import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class addColumnSlugToArticleTable1578149249822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumns('articles', [
            new TableColumn({
                name: 'slug',
                type: 'varchar',
                isUnique: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumns('articles', [
            new TableColumn({
                name: 'slug',
                type: 'varchar',
            }),
        ]);
    }

}
