import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyStakeholderProject1716294957716 implements MigrationInterface {
    name = 'modifyStakeholderProject1716294957716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stakeholder_project_entity" DROP CONSTRAINT "UQ_65dde110ebec8fa8cca6c94207b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stakeholder_project_entity" ADD CONSTRAINT "UQ_65dde110ebec8fa8cca6c94207b" UNIQUE ("stakeholder_project_code")`);
    }

}
