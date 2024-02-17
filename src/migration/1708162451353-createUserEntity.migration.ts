import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserEntity1708162451353 implements MigrationInterface {
    name = 'createUserEntity1708162451353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_entity" ("id" SERIAL NOT NULL, "userid" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying, "password" character varying NOT NULL, "menu_right" character varying, "user_type" character varying, "status" character varying, "lastlogdate" character varying, "pwd_status" integer, "pwd_date_created" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_afcd3ae9dbf45eced5872ca49b0" UNIQUE ("email"), CONSTRAINT "PK_8e3e2ffd30d4c1313cbd667341f" PRIMARY KEY ("id", "userid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_entity"`);
    }

}
