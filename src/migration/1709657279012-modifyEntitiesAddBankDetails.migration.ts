import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyEntitiesAddBankDetails1709657279012 implements MigrationInterface {
    name = 'modifyEntitiesAddBankDetails1709657279012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "bank_name" character varying`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "account_name" character varying`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "account_number" character varying`);
        await queryRunner.query(`ALTER TABLE "worker_entity" ADD "bank_name" character varying`);
        await queryRunner.query(`ALTER TABLE "worker_entity" ADD "account_name" character varying`);
        await queryRunner.query(`ALTER TABLE "worker_entity" ADD "account_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker_entity" DROP COLUMN "account_number"`);
        await queryRunner.query(`ALTER TABLE "worker_entity" DROP COLUMN "account_name"`);
        await queryRunner.query(`ALTER TABLE "worker_entity" DROP COLUMN "bank_name"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "account_number"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "account_name"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "bank_name"`);
    }

}
