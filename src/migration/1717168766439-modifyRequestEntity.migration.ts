import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyRequestEntity1717168766439 implements MigrationInterface {
    name = 'modifyRequestEntity1717168766439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_entity" ADD "account_number" character varying`);
        await queryRunner.query(`ALTER TABLE "request_entity" ADD "account_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_entity" DROP COLUMN "account_name"`);
        await queryRunner.query(`ALTER TABLE "request_entity" DROP COLUMN "account_number"`);
    }

}
