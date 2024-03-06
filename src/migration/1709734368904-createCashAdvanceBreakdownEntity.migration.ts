import {MigrationInterface, QueryRunner} from "typeorm";

export class createCashAdvanceBreakdownEntity1709734368904 implements MigrationInterface {
    name = 'createCashAdvanceBreakdownEntity1709734368904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cash_advance_breakdown_entity" ("id" SERIAL NOT NULL, "request_code" character varying, "description" character varying, "amount" numeric(10,2) DEFAULT '0', "added_by" character varying, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38924b24e35174c603ea1f23446" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cash_advance_breakdown_entity"`);
    }

}
