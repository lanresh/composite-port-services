import {MigrationInterface, QueryRunner} from "typeorm";

export class createToolFromStoreEntity1710768970835 implements MigrationInterface {
    name = 'createToolFromStoreEntity1710768970835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tool_from_store_entity" ("id" SERIAL NOT NULL, "tool_from_store_code" character varying, "tool_name" character varying, "picked_by" character varying, "picked_on" character varying, "status" character varying, "returned_on" character varying, "project_name" character varying, "project_code" character varying, "request_type" character varying, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_354012535a033e6d2410f07d569" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tool_from_store_entity"`);
    }

}
