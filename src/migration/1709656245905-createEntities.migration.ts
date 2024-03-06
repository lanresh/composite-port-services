import {MigrationInterface, QueryRunner} from "typeorm";

export class createEntities1709656245905 implements MigrationInterface {
    name = 'createEntities1709656245905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cash_advance_entity_status_enum" AS ENUM('Pending', 'Approved')`);
        await queryRunner.query(`CREATE TABLE "cash_advance_entity" ("cash_id" SERIAL NOT NULL, "project_code" character varying, "project_name" character varying, "cash_advance_type" character varying, "request_code" character varying, "staff_id" character varying, "staff_name" character varying, "amount_collected" numeric(10,2) DEFAULT '0', "amount_recorded" numeric(10,2) DEFAULT '0', "balance" numeric(10,2) DEFAULT '0', "status" "public"."cash_advance_entity_status_enum" NOT NULL DEFAULT 'Pending', "purpose" character varying, "bank_to" character varying, "payment_method" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8edc83af606910d21c6f0343f0d" PRIMARY KEY ("cash_id"))`);
        await queryRunner.query(`CREATE TABLE "startup_cost_entity" ("id" SERIAL NOT NULL, "startup_code" character varying, "project_code" character varying, "startup_desc" character varying, "startup_type" character varying, "startup_cost" numeric(10,2) DEFAULT '0', "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8ed5d72282a2fb15123ad345ea1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "worker_jobs_entity" ("id" SERIAL NOT NULL, "job_code" character varying, "worker_code" character varying, "project_code" character varying, "worker_service" character varying, "worker_service_charge" numeric(10,2) DEFAULT '0', "amount_paid" numeric(10,2) DEFAULT '0', "outstanding_balance" numeric(10,2) DEFAULT '0', "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_17dd57b95ecf361db06b1022aa9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "worker_jobs_entity"`);
        await queryRunner.query(`DROP TABLE "startup_cost_entity"`);
        await queryRunner.query(`DROP TABLE "cash_advance_entity"`);
        await queryRunner.query(`DROP TYPE "public"."cash_advance_entity_status_enum"`);
    }

}
