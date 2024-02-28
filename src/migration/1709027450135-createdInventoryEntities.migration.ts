import {MigrationInterface, QueryRunner} from "typeorm";

export class createdInventoryEntities1709027450135 implements MigrationInterface {
    name = 'createdInventoryEntities1709027450135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory_entity" ("inventory_id" SERIAL NOT NULL, "inventory_code" character varying, "name" character varying, "type" character varying, "unit_price" integer, "quantity" integer, "total_price" integer, "total_quantity" integer, "remaining_quantity" integer, "created_by" character varying, "updated_by" character varying, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_62c5e2bc07b2919d7b93c2187de" UNIQUE ("inventory_code"), CONSTRAINT "PK_0090bd695c37045ece8fb65a2de" PRIMARY KEY ("inventory_id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_type_entity" ("inventory_type_id" SERIAL NOT NULL, "type" character varying, "description" character varying, "quantity" integer, "unit_price" integer, "createdBy" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5597fc6ed0d1ef09035d7ebefd8" PRIMARY KEY ("inventory_type_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "inventory_type_entity"`);
        await queryRunner.query(`DROP TABLE "inventory_entity"`);
    }

}
