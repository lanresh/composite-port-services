import {MigrationInterface, QueryRunner} from "typeorm";

export class createdMaterialEntities1708959062716 implements MigrationInterface {
    name = 'createdMaterialEntities1708959062716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "material_sub_type_entity" ("sub_type_id" SERIAL NOT NULL, "sub_type_desc" character varying, "material_type_id" integer, "dimension" character varying, "sub_type_category" character varying, "created_by" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c753834385c4e2e3dc23480091d" PRIMARY KEY ("sub_type_id"))`);
        await queryRunner.query(`CREATE TABLE "material_type_entity" ("material_type_id" SERIAL NOT NULL, "material_type_desc" character varying, "created_by" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ebf3158887e8ab4ce20308f57eb" PRIMARY KEY ("material_type_id"))`);
        await queryRunner.query(`CREATE TABLE "material_entity" ("id" SERIAL NOT NULL, "project_code" character varying, "supplier_code" character varying, "supplier_name" character varying, "material_code" character varying, "company" character varying, "address" character varying, "contact_person" character varying, "contact_mobile" character varying, "ofc_phone" character varying, "description" character varying, "quantity" integer, "unit_price" integer, "total_price" integer, "payment_mode" character varying, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2922f50ba324ac4f4b6464da15c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "material_entity"`);
        await queryRunner.query(`DROP TABLE "material_type_entity"`);
        await queryRunner.query(`DROP TABLE "material_sub_type_entity"`);
    }

}
