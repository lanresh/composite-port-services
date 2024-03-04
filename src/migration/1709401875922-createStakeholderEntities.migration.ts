import {MigrationInterface, QueryRunner} from "typeorm";

export class createStakeholderEntities1709401875922 implements MigrationInterface {
    name = 'createStakeholderEntities1709401875922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stakeholder_project_entity" ("id" SERIAL NOT NULL, "stakeholder_code" character varying, "stakeholder_project_code" character varying, "stakeholder_amount" numeric(10,2) DEFAULT '0', "approved_amount" numeric(10,2) DEFAULT '0', "other_amount" numeric(10,2) DEFAULT '0', "createdBy" character varying, "comment" character varying, "status" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d2596797e68255abecff1788333" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stakeholder_entity" ("id" SERIAL NOT NULL, "stakeholder_code" character varying NOT NULL, "stakeholder_name" character varying, "stakeholder_address" character varying, "stakeholder_ofc_phone" character varying, "government_agencies" character varying, "non_government_agencies" character varying, "other_agency" character varying, "contact_person" character varying, "contact_mobile" character varying, "contact_home_phone" character varying, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_84a66bdf1c0ac79759b1837bf82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stakeholder_entity"`);
        await queryRunner.query(`DROP TABLE "stakeholder_project_entity"`);
    }

}
