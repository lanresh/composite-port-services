import {MigrationInterface, QueryRunner} from "typeorm";

export class createContractorEntities1709410481598 implements MigrationInterface {
    name = 'createContractorEntities1709410481598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contractor_project_entity" ("id" SERIAL NOT NULL, "contractor_code" character varying, "contractor_project_code" character varying, "contractor_amount" numeric(10,2) DEFAULT '0', "approved_amount" numeric(10,2) DEFAULT '0', "service" character varying, "createdBy" character varying, "comment" character varying, "status" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1a1b3ffea3acbb5194fbde96cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contractor_entity" ("id" SERIAL NOT NULL, "contractor_code" character varying, "contractor_name" character varying, "contractor_service" character varying, "contractor_address" character varying, "contractor_ofc_phone" character varying, "contact_person" character varying, "contact_mobile" character varying, "contact_home_phone" character varying, "email" character varying, "website" character varying, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc3e33d8a3dd12c81faadded0fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request_entity" ALTER COLUMN "approved_quantity" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_entity" ALTER COLUMN "approved_quantity" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "contractor_entity"`);
        await queryRunner.query(`DROP TABLE "contractor_project_entity"`);
    }

}
