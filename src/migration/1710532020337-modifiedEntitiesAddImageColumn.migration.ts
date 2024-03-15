import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedEntitiesAddImageColumn1710532020337 implements MigrationInterface {
    name = 'modifiedEntitiesAddImageColumn1710532020337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_entity" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "phone_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "mobile_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "activation_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_report_entity" DROP COLUMN "photograph_id"`);
        await queryRunner.query(`ALTER TABLE "project_report_entity" ADD "photograph_id" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_report_entity" DROP COLUMN "photograph_id"`);
        await queryRunner.query(`ALTER TABLE "project_report_entity" ADD "photograph_id" character varying`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "activation_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "mobile_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_entity" ALTER COLUMN "phone_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "client_entity" DROP COLUMN "image"`);
    }

}
