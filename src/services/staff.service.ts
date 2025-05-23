import { StaffEntity } from '@/entities/staff.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Staff } from '@/interfaces/staff.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { AuthService } from './auth.service';
import { generateRandomCode } from '@/helpers/code_generator.helper';
import { StaffPrivilege } from '@/interfaces/staff_privilege.interface';

@EntityRepository(StaffEntity)
export class StaffService extends Repository<StaffEntity> {
  public async createStaff(staffData: Staff): Promise<Staff> {
    const findStaff: Staff[] = await getConnection().query('SELECT * FROM staff_entity WHERE email = $1', [staffData.email]);
    if (findStaff.length) throw new HttpException(409, `Staff with ${staffData.email} already exist`);

    const findUser: Staff[] = await getConnection().query('SELECT * FROM users_entity WHERE email = $1', [staffData.email]);
    if (findUser.length) throw new HttpException(409, `Staff with ${staffData.email} already exist as a User and can not be created as a Staff`);

    // generate user ID
    const userId = await generateRandomCode('staff_entity', 'userid', 'staff');

    //create staff data
    const createStaffData: Staff = await getConnection().query(
      `INSERT INTO staff_entity
                (userid, firstname, middlename, lastname, dob, "stateOfOrigin", lga, sex, marital_status, address, home_phone, cell_phone, email, "nextOfKin", relationship, "addressOfNOK", "emailOfNOK", "phoneOfNOK", date_employed, deptid, gradeid, branchcode, employee_status, role, staff_type, bank_name, account_name, account_number, secondary_email, employment_type)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30) RETURNING *`,
      [
        userId,
        staffData.firstname,
        staffData.middlename,
        staffData.lastname,
        staffData.dob,
        staffData.stateOfOrigin,
        staffData.lga,
        staffData.sex,
        staffData.marital_status,
        staffData.address,
        staffData.home_phone,
        staffData.cell_phone,
        staffData.email,
        staffData.nextOfKin,
        staffData.relationship,
        staffData.addressOfNOK,
        staffData.emailOfNOK,
        staffData.phoneOfNOK,
        staffData.date_employed,
        staffData.deptid,
        staffData.gradeid,
        staffData.branchcode,
        staffData.employee_status,
        staffData.role,
        staffData.staff_type,
        staffData.bank_name,
        staffData.account_name,
        staffData.account_number,
        staffData.secondary_email,
        staffData.employment_type,
      ],
    );

    await new AuthService().createUser(userId, staffData);

    return createStaffData[0];
  }

  public async findAllStaff(): Promise<Staff[]> {
    const staffs: Staff[] = await getConnection().query(`SELECT * FROM staff_entity`);

    return staffs;
  }

  public async findStaffById(userId: string): Promise<Staff> {
    const staff: Staff[] = await getConnection().query(`SELECT * FROM staff_entity WHERE userid = $1`, [userId]);
    if (!staff.length) throw new HttpException(409, `Staff with ID ${userId} does not exist`);

    return staff[0];
  }

  public async updateStaff(userId: string, staffData: Partial<Staff>): Promise<Staff> {
    const findStaff: Staff = await StaffEntity.findOne({ where: { userid: userId } });
    if (!findStaff) throw new HttpException(409, "User doesn't exist");

    await StaffEntity.update({ userid: userId }, staffData);

    const updateStaff: Staff = await StaffEntity.findOne({ where: { userid: userId } });
    return updateStaff;
  }

  public async getAllRoles(): Promise<Staff[]> {
    const roles: Staff[] = await getConnection().query('SELECT DISTINCT role FROM staff_entity');

    return roles;
  }

  public async getRoleStaffs(role: string): Promise<Staff[]> {
    const roleStaffs: Staff[] = await getConnection().query(`SELECT userid, firstname, middlename, lastname FROM staff_entity WHERE role = $1`, [
      role,
    ]);
    if (!roleStaffs.length) throw new HttpException(409, 'No staff assigned to this role');

    return roleStaffs;
  }

  public async deleteStaff(userId: string): Promise<Staff> {
    const deletedStaff: Staff = await getConnection().query(`DELETE FROM staff_entity WHERE userid = $1 RETURNING *`, [userId]);
    if (!deletedStaff[0].length) throw new HttpException(409, 'Staff does not exist');

    await getConnection().query(`DELETE FROM users_entity WHERE userid = $1`, [userId]);

    return deletedStaff[0];
  }

  public async grantStaffPrivilege(privilegeData: StaffPrivilege[]): Promise<StaffPrivilege[]> {
    const data: StaffPrivilege[] = [];
    for (const privilege of privilegeData) {
    const createPrivilegeData: StaffPrivilege = await getConnection().query(
      'INSERT INTO staff_privilege_entity (staff_id, type, can_view, can_edit, can_delete, can_create) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (staff_id, type) DO UPDATE SET can_view = $3, can_edit = $4, can_delete = $5, can_create = $6 RETURNING *',
      [
        privilege.staff_id,
        privilege.type,
        privilege.can_view || 0,
        privilege.can_edit || 0,
        privilege.can_delete || 0,
        privilege.can_create || 0,
      ],
    );

    data.push(createPrivilegeData[0]);
    }
    return data;
  }

  public async getStaffPrivileges(staffId: string): Promise<StaffPrivilege[]> {
    const privileges: StaffPrivilege[] = await getConnection().query(
      'SELECT * FROM staff_privilege_entity WHERE staff_id = $1',
      [staffId],
    );
    return privileges;
  }
}
