import {MigrationInterface, QueryRunner} from "typeorm";

export class createdConsultantsEntity1712405546109 implements MigrationInterface {
    name = 'createdConsultantsEntity1712405546109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client_flat_entity" ("id" SERIAL NOT NULL, "client_id" character varying, "project_id" character varying, "project_code" character varying, "flat_code" character varying, "date" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4e9d778a13b26d5fc370f886038" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant_project_entity" ("id" SERIAL NOT NULL, "client_id" character varying, "project_id" character varying, "project_code" character varying, "project_name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e712e5047b6ef277a4538b55892" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant_entity" ("id" SERIAL NOT NULL, "consultant_code" character varying, "name" character varying, "type" character varying, "contact" character varying, "email" character varying, "website" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e42f638b4b445406dfef561707" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_project_entity" ("id" SERIAL NOT NULL, "client_id" character varying, "project_id" character varying, "project_code" character varying, "project_name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5cd004a2224e6b26619a5196078" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "client_project_entity"`);
        await queryRunner.query(`DROP TABLE "consultant_entity"`);
        await queryRunner.query(`DROP TABLE "consultant_project_entity"`);
        await queryRunner.query(`DROP TABLE "client_flat_entity"`);
    }

}
