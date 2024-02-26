import {MigrationInterface, QueryRunner} from "typeorm";

export class createdSupplierEntities1708955098883 implements MigrationInterface {
    name = 'createdSupplierEntities1708955098883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier_tools_machinery_entity" ("tool_id" SERIAL NOT NULL, "tool_code" character varying, "supplier_code" character varying, "supplier_name" character varying, "tool_type" character varying, "description" character varying, "others" character varying, "procurement_type" character varying, "created_by" character varying NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8b9c85eb74282bd41d6a4bd3b7a" PRIMARY KEY ("tool_id"))`);
        await queryRunner.query(`CREATE TABLE "supplier_materials_entity" ("mat_id" SERIAL NOT NULL, "mat_code" character varying, "supplier_code" character varying, "supplier_name" character varying, "mat_desc" character varying, "project_code" character varying, "quantity" integer, "unit_price" integer, "total_price" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_95d564b33025ff6fb4c6fec364b" PRIMARY KEY ("mat_id"))`);
        await queryRunner.query(`CREATE TABLE "supplier_entity" ("id" SERIAL NOT NULL, "supplier_code" character varying, "supplier_name" character varying, "supplier_address" character varying, "supplier_ofc_phone" character varying, "contact_person" character varying, "contact_mobile" character varying, "contact_home_phone" character varying, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_72d4c59ef8e52fc761dfb5a20d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "supplier_entity"`);
        await queryRunner.query(`DROP TABLE "supplier_materials_entity"`);
        await queryRunner.query(`DROP TABLE "supplier_tools_machinery_entity"`);
    }

}
