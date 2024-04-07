import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyConsultantProjectEntity1712509807217 implements MigrationInterface {
    name = 'modifyConsultantProjectEntity1712509807217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultant_project_entity" RENAME COLUMN "client_id" TO "consultant_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultant_project_entity" RENAME COLUMN "consultant_id" TO "client_id"`);
    }

}
