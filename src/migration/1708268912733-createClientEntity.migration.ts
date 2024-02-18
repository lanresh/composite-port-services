import {MigrationInterface, QueryRunner} from "typeorm";

export class createClientEntity1708268912733 implements MigrationInterface {
    name = 'createClientEntity1708268912733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client_entity" ("client_id" SERIAL NOT NULL, "userid" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "mobile_number" character varying NOT NULL, "address" character varying NOT NULL, "state" character varying NOT NULL, "activation_code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21ed0cd30a6dd656a1afadbc517" PRIMARY KEY ("client_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "client_entity"`);
    }

}
