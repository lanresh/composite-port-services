import {MigrationInterface, QueryRunner} from "typeorm";

export class createStaffEntity1708265861235 implements MigrationInterface {
    name = 'createStaffEntity1708265861235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "staff_entity" ("id" SERIAL NOT NULL, "userid" character varying NOT NULL, "firstname" character varying, "middlename" character varying, "lastname" character varying, "dob" character varying, "stateOfOrigin" character varying, "lga" character varying, "sex" character varying, "marital_status" character varying, "address" character varying, "home_phone" character varying, "cell_phone" character varying, "email" character varying NOT NULL, "nextOfKin" character varying, "relationship" character varying, "addressOfNOK" character varying, "emailOfNOK" character varying, "phoneOfNOK" character varying, "date_employed" character varying, "deptid" character varying, "gradeid" character varying, "branchcode" character varying, "employee_status" character varying, "role" character varying NOT NULL, "staff_type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f672db88e2155f31c1c96bb02be" PRIMARY KEY ("id", "userid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "staff_entity"`);  
    }

}
