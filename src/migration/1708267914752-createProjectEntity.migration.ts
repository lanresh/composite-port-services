import {MigrationInterface, QueryRunner} from "typeorm";

export class createProjectEntity1708267914752 implements MigrationInterface {
    name = 'createProjectEntity1708267914752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_entity" ("id" SERIAL NOT NULL, "project_name" character varying, "project_description" character varying, "project_code" character varying NOT NULL, "project_location" character varying, "address" character varying, "city" character varying, "state" character varying, "lga" character varying, "project_duration" character varying, "start_date" character varying, "end_date" character varying, "comment" character varying, "status" character varying, "date_added" character varying, "project_supervisor" character varying, "supervisor_id" character varying, "createdBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7a75a94e01d0b50bff123db1b87" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "project_entity"`);
    }

}
