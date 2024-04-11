import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyCashAdvanaceEntity1712825667123 implements MigrationInterface {
    name = 'modifyCashAdvanaceEntity1712825667123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" ADD "action_type" character varying`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" ADD "action_by" character varying`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" ADD CONSTRAINT "UQ_8477669195f3cdfc8089bfc1bae" UNIQUE ("request_code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" DROP CONSTRAINT "UQ_8477669195f3cdfc8089bfc1bae"`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" DROP COLUMN "action_by"`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" DROP COLUMN "action_type"`);
    }

}
