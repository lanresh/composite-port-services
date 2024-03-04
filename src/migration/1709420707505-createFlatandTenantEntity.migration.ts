import {MigrationInterface, QueryRunner} from "typeorm";

export class createFlatandTenantEntity1709420707505 implements MigrationInterface {
    name = 'createFlatandTenantEntity1709420707505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."project_flats_entity_status_enum" AS ENUM('Vacant', 'Occupied')`);
        await queryRunner.query(`CREATE TABLE "project_flats_entity" ("flat_id" SERIAL NOT NULL, "flat_code" character varying, "project_name" character varying, "project_code" character varying, "flat_desc" character varying, "comment" character varying, "status" "public"."project_flats_entity_status_enum" NOT NULL DEFAULT 'Vacant', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cdab550594b95559161cc2a0945" PRIMARY KEY ("flat_id"))`);
        await queryRunner.query(`CREATE TABLE "tenant_entity" ("tenant_id" SERIAL NOT NULL, "tenant_code" character varying, "title" character varying, "full_name" character varying, "phone_number" character varying, "email" character varying, "password" character varying, "project_name" character varying, "project_details" character varying, "flat_description" character varying, "flat_code" character varying, "annual_rent" numeric(10,2) DEFAULT '0', "comment" character varying, "status" character varying, "rent_payment" character varying, "reminder" character varying, "fee_type" text, "value" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_314c0bec76138744e3121f3da38" PRIMARY KEY ("tenant_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tenant_entity"`);
        await queryRunner.query(`DROP TABLE "project_flats_entity"`);
        await queryRunner.query(`DROP TYPE "public"."project_flats_entity_status_enum"`);
    }

}
