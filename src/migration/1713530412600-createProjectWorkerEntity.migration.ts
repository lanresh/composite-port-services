import {MigrationInterface, QueryRunner} from "typeorm";

export class createProjectWorkerEntity1713530412600 implements MigrationInterface {
    name = 'createProjectWorkerEntity1713530412600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_worker_entity" ("id" SERIAL NOT NULL, "project_code" character varying, "project_name" character varying, "service_type" character varying, "worker_code" character varying, "worker_name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_98285963ff7b5b21a9deab20f46" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "project_worker_entity"`);
    }

}
