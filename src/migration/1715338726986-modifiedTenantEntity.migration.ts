import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedTenantEntity1715338726986 implements MigrationInterface {
    name = 'modifiedTenantEntity1715338726986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP COLUMN "fees"`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD "fees" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP COLUMN "fees"`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD "fees" text`);
    }

}
