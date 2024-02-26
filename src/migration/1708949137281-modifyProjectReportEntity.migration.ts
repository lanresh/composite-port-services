import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyProjectReportEntity1708949137281 implements MigrationInterface {
    name = 'modifyProjectReportEntity1708949137281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_report_entity" ADD "createdBy" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_report_entity" DROP COLUMN "createdBy"`);
    }

}
