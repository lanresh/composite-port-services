import {MigrationInterface, QueryRunner} from "typeorm";

export class createRequestEntity1709408954576 implements MigrationInterface {
    name = 'createRequestEntity1709408954576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request_entity" ("id" SERIAL NOT NULL, "request_code" character varying, "carttemp_sess" character varying, "staff_id" character varying, "staff_name" character varying, "staff_email" character varying, "request_type" character varying, "project_name" character varying, "project_code" character varying, "supplier_code" character varying, "supplier_name" character varying, "supplier_material" character varying, "description" character varying, "quantity" integer, "unit_price" numeric(10,2) DEFAULT '0', "total_price" numeric(10,2) DEFAULT '0', "worker_name" character varying, "worker_code" character varying, "worker_service" character varying, "amount" numeric(10,2) DEFAULT '0', "job_code" character varying, "comment" character varying, "response" character varying, "status" "public"."request_entity_status_enum" NOT NULL DEFAULT 'PENDING', "date" TIMESTAMP, "company" character varying, "company_address" character varying, "contact_person" character varying, "contact_mobile" character varying, "ofc_phone" character varying, "cash_advance_purpose" character varying, "tool_name" character varying, "approved_by" character varying, "approved_on" TIMESTAMP, "approved_amount" numeric(10,2) DEFAULT '0', "approved_quantity" integer NOT NULL, "approved_unit_price" numeric(10,2) DEFAULT '0', "approved_total_amount" numeric(10,2) DEFAULT '0', "tool_machinery_type" character varying, "inventory_type_id" integer, "supervisor_comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_414c4dc3ebedd19498f49a802e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "request_entity"`);
    }

}
