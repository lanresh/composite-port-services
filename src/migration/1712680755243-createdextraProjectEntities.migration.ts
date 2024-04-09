import {MigrationInterface, QueryRunner} from "typeorm";

export class createdextraProjectEntities1712680755243 implements MigrationInterface {
    name = 'createdextraProjectEntities1712680755243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client_images_entity" ("id" SERIAL NOT NULL, "client_id" character varying, "image" character varying, "project_id" character varying, "project_code" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3dd99205f6a75d175023104ac8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_comment_entity" ("comment_id" SERIAL NOT NULL, "client_id" character varying, "project_code" character varying, "comment_code" character varying, "sender_name" character varying, "comment_title" character varying, "comment" character varying, "status" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ce94303a9823b9ad54b6efe75e5" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "project_team_entity" ("id" SERIAL NOT NULL, "project_name" character varying, "project_code" character varying, "role" character varying, "staff_id" character varying, "staff_name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36f0b3c31aff60c33f92841fe4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" DROP COLUMN "purpose"`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" ADD "decision" character varying`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" ADD "decision_reason" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" DROP COLUMN "decision_reason"`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" DROP COLUMN "decision"`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "cash_advance_entity" ADD "purpose" character varying`);
        await queryRunner.query(`DROP TABLE "project_team_entity"`);
        await queryRunner.query(`DROP TABLE "project_comment_entity"`);
        await queryRunner.query(`DROP TABLE "client_images_entity"`);
    }

}
