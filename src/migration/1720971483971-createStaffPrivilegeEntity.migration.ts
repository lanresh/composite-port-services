import {MigrationInterface, QueryRunner} from "typeorm";

export class createStaffPrivilegeEntity1720971483971 implements MigrationInterface {
    name = 'createStaffPrivilegeEntity1720971483971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "staff_privilege_entity" ("id" SERIAL NOT NULL, "staff_id" character varying, "type" character varying, "can_view" integer, "can_edit" integer, "can_delete" integer, "can_create" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7e35f6dfab58e9cfddbb7e57e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "staff_privilege_entity"`);
    }

}
