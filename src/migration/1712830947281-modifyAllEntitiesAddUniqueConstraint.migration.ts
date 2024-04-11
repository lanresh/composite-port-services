import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyAllEntitiesAddUniqueConstraint1712830947281 implements MigrationInterface {
    name = 'modifyAllEntitiesAddUniqueConstraint1712830947281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_entity" ADD CONSTRAINT "UQ_6920199e386de236d87a60f9d20" UNIQUE ("userid")`);
        await queryRunner.query(`ALTER TABLE "consultant_entity" ADD CONSTRAINT "UQ_f345bee0f10646b14fbcd228018" UNIQUE ("consultant_code")`);
        await queryRunner.query(`ALTER TABLE "contractor_entity" ADD CONSTRAINT "UQ_8e40bf041dd35b517561300288a" UNIQUE ("contractor_code")`);
        await queryRunner.query(`ALTER TABLE "project_report_entity" ADD CONSTRAINT "UQ_e037b75dc20244cb19386bc33ca" UNIQUE ("report_code")`);
        await queryRunner.query(`ALTER TABLE "request_entity" ADD CONSTRAINT "UQ_6237b0be09ef5f19c2328c8ccfc" UNIQUE ("request_code")`);
        await queryRunner.query(`ALTER TABLE "project_entity" ADD CONSTRAINT "UQ_465c6054f734ebe72fab7bce0ca" UNIQUE ("project_code")`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD CONSTRAINT "UQ_e83f781717cd03ad03b9b9d7f1a" UNIQUE ("userid")`);
        await queryRunner.query(`ALTER TABLE "stakeholder_entity" ADD CONSTRAINT "UQ_df2719c42b693a99ee88d88313a" UNIQUE ("stakeholder_code")`);
        await queryRunner.query(`ALTER TABLE "startup_cost_entity" ADD CONSTRAINT "UQ_be695fc305dfd9b1b359eaf9c9d" UNIQUE ("startup_code")`);
        await queryRunner.query(`ALTER TABLE "stakeholder_project_entity" ADD CONSTRAINT "UQ_65dde110ebec8fa8cca6c94207b" UNIQUE ("stakeholder_project_code")`);
        await queryRunner.query(`ALTER TABLE "supplier_materials_entity" ADD CONSTRAINT "UQ_eb358face244641353b3b32b19b" UNIQUE ("mat_code")`);
        await queryRunner.query(`ALTER TABLE "supplier_entity" ADD CONSTRAINT "UQ_68f59b35dd0d839d53b46eacb84" UNIQUE ("supplier_code")`);
        await queryRunner.query(`ALTER TABLE "tool_from_store_entity" ADD CONSTRAINT "UQ_60f94ce2a5393fac4206b9db101" UNIQUE ("tool_from_store_code")`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" ADD CONSTRAINT "UQ_2b9b18dc9b615438650f825af93" UNIQUE ("tenant_code")`);
        await queryRunner.query(`ALTER TABLE "supplier_tools_machinery_entity" ADD CONSTRAINT "UQ_da530323a8f438351045108e6a0" UNIQUE ("tool_code")`);
        await queryRunner.query(`ALTER TABLE "worker_jobs_entity" ADD CONSTRAINT "UQ_53d5f8a57e0b7e488ed5b9cb118" UNIQUE ("job_code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker_jobs_entity" DROP CONSTRAINT "UQ_53d5f8a57e0b7e488ed5b9cb118"`);
        await queryRunner.query(`ALTER TABLE "supplier_tools_machinery_entity" DROP CONSTRAINT "UQ_da530323a8f438351045108e6a0"`);
        await queryRunner.query(`ALTER TABLE "tenant_entity" DROP CONSTRAINT "UQ_2b9b18dc9b615438650f825af93"`);
        await queryRunner.query(`ALTER TABLE "tool_from_store_entity" DROP CONSTRAINT "UQ_60f94ce2a5393fac4206b9db101"`);
        await queryRunner.query(`ALTER TABLE "supplier_entity" DROP CONSTRAINT "UQ_68f59b35dd0d839d53b46eacb84"`);
        await queryRunner.query(`ALTER TABLE "supplier_materials_entity" DROP CONSTRAINT "UQ_eb358face244641353b3b32b19b"`);
        await queryRunner.query(`ALTER TABLE "stakeholder_project_entity" DROP CONSTRAINT "UQ_65dde110ebec8fa8cca6c94207b"`);
        await queryRunner.query(`ALTER TABLE "startup_cost_entity" DROP CONSTRAINT "UQ_be695fc305dfd9b1b359eaf9c9d"`);
        await queryRunner.query(`ALTER TABLE "stakeholder_entity" DROP CONSTRAINT "UQ_df2719c42b693a99ee88d88313a"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP CONSTRAINT "UQ_e83f781717cd03ad03b9b9d7f1a"`);
        await queryRunner.query(`ALTER TABLE "project_entity" DROP CONSTRAINT "UQ_465c6054f734ebe72fab7bce0ca"`);
        await queryRunner.query(`ALTER TABLE "request_entity" DROP CONSTRAINT "UQ_6237b0be09ef5f19c2328c8ccfc"`);
        await queryRunner.query(`ALTER TABLE "project_report_entity" DROP CONSTRAINT "UQ_e037b75dc20244cb19386bc33ca"`);
        await queryRunner.query(`ALTER TABLE "contractor_entity" DROP CONSTRAINT "UQ_8e40bf041dd35b517561300288a"`);
        await queryRunner.query(`ALTER TABLE "consultant_entity" DROP CONSTRAINT "UQ_f345bee0f10646b14fbcd228018"`);
        await queryRunner.query(`ALTER TABLE "client_entity" DROP CONSTRAINT "UQ_6920199e386de236d87a60f9d20"`);
    }

}
