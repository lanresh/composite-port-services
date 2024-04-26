import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyEntities1714127162869 implements MigrationInterface {
    name = 'modifyEntities1714127162869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_entity" ADD "id_type" character varying`);
        await queryRunner.query(`ALTER TABLE "client_entity" ADD "id_number" character varying`);
        await queryRunner.query(`ALTER TABLE "client_entity" ADD "id_image" character varying`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD "project_code" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP COLUMN "project_code"`);
        await queryRunner.query(`ALTER TABLE "client_entity" DROP COLUMN "id_image"`);
        await queryRunner.query(`ALTER TABLE "client_entity" DROP COLUMN "id_number"`);
        await queryRunner.query(`ALTER TABLE "client_entity" DROP COLUMN "id_type"`);
    }

}
