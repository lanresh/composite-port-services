import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyStaffPrivilege1721065139221 implements MigrationInterface {
    name = 'modifyStaffPrivilege1721065139221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_privilege_entity" ADD CONSTRAINT "UQ_2dc6c3cab50f1bd9395f24e3e3b" UNIQUE ("staff_id", "type")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_privilege_entity" DROP CONSTRAINT "UQ_2dc6c3cab50f1bd9395f24e3e3b"`);
    }

}
