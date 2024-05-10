import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedTenantEntity21715340013274 implements MigrationInterface {
    name = 'modifiedTenantEntity21715340013274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP COLUMN "fees"`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD "fees" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP COLUMN "fees"`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD "fees" json`);
    }

}
