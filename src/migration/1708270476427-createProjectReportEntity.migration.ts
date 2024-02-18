import {MigrationInterface, QueryRunner} from "typeorm";

export class createProjectReportEntity1708270476427 implements MigrationInterface {
    name = 'createProjectReportEntity1708270476427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_report_entity" ("id" SERIAL NOT NULL, "report_code" character varying, "report_type" character varying, "created_for" character varying, "project_name" character varying, "project_code" character varying, "project_supervisor" character varying, "report_summary" character varying, "challenges" character varying, "solutions" character varying, "recommendation" character varying, "weekly_projection" character varying, "materials_required_for_projection" character varying, "materials_on_site" character varying, "status" character varying, "submitted_by" character varying, "submitted_on" character varying, "visitor" character varying, "weather" character varying, "photograph_id" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_baa845b538747063cefe4cf31b4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "project_report_entity"`);
    }

}
