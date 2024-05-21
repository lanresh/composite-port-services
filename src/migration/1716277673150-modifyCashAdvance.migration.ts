import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyCashAdvance1716277673150 implements MigrationInterface {
    name = 'modifyCashAdvance1716277673150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" ADD "unused_cash" numeric(10,2) DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" DROP COLUMN "unused_cash"`);
    }

}
