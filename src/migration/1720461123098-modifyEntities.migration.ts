import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyEntities1720461123098 implements MigrationInterface {
    name = 'modifyEntities1720461123098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "secondary_email" character varying`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "employment_type" character varying`);
        await queryRunner.query(`ALTER TABLE "supplier_entity" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "supplier_entity" ADD "website" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_entity" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "supplier_entity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "employment_type"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "secondary_email"`);
    }

}
