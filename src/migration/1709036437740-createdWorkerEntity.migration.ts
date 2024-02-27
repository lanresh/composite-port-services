import {MigrationInterface, QueryRunner} from "typeorm";

export class createdWorkerEntity1709036437740 implements MigrationInterface {
    name = 'createdWorkerEntity1709036437740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "worker_entity" ("id" SERIAL NOT NULL, "worker_code" character varying NOT NULL, "worker_name" character varying, "worker_company" character varying, "worker_address" character varying, "worker_email" character varying, "worker_mobile" character varying, "worker_home_phone" character varying, "worker_ofc_phone" character varying, "service_type" character varying, "section" character varying, "worker_source" character varying, "site_management" character varying, "project_code" character varying, "worker_service" character varying, "worker_service_charge" integer, "amount_paid" integer, "outstanding_balance" integer, "date_assigned_to_project" TIMESTAMP, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_aa476661c1685c4e94c18574cd8" UNIQUE ("worker_code"), CONSTRAINT "PK_7b07d16a919661836685e11e8da" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "worker_entity"`);
    }

}
