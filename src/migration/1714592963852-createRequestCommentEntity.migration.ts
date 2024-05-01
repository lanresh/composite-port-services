import {MigrationInterface, QueryRunner} from "typeorm";

export class createRequestCommentEntity1714592963852 implements MigrationInterface {
    name = 'createRequestCommentEntity1714592963852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request_comment_entity" ("id" SERIAL NOT NULL, "request_code" character varying, "user_id" character varying, "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3068926abaa62d8a783ffeadb9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request_entity" ADD "payment_method" character varying`);
        await queryRunner.query(`ALTER TABLE "request_entity" ADD "bank" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_entity" DROP COLUMN "bank"`);
        await queryRunner.query(`ALTER TABLE "request_entity" DROP COLUMN "payment_method"`);
        await queryRunner.query(`DROP TABLE "request_comment_entity"`);
    }

}
