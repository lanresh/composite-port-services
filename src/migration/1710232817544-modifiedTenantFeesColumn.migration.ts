import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedTenantFeesColumn1710232817544 implements MigrationInterface {
    name = 'modifiedTenantFeesColumn1710232817544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP COLUMN "fee_type"`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD "fees" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP COLUMN "fees"`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD "value" text`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD "fee_type" text`);
    }

}
