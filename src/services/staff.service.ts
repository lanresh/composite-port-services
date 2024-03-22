import { StaffEntity } from '@/entities/staff.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Staff } from '@/interfaces/staff.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { AuthService } from './auth.service';

const generateUserId = async () => {
  const count = await getConnection().getRepository(StaffEntity).count();

  //generate user id
  const userId = 'usr-' + (count + 1).toString().padStart(4, '0');
  return userId;
};

@EntityRepository(StaffEntity)
export class StaffService extends Repository<StaffEntity> {
  public async createStaff(staffData: Staff): Promise<Staff> {
    const findStaff: Staff[] = await getConnection().query('SELECT * FROM staff_entity WHERE email = $1', [staffData.email]);
    if (findStaff.length) throw new HttpException(409, `Staff with ${staffData.email} already exist`);

    // generate user ID
    const userId = await generateUserId();

    //create staff data
    const createStaffData: Staff = await getConnection().query(
      `INSERT INTO staff_entity
                (userid, firstname, middlename, lastname, dob, "stateOfOrigin", lga, sex, marital_status, address, home_phone, cell_phone, email, "nextOfKin", relationship, "addressOfNOK", "emailOfNOK", "phoneOfNOK", date_employed, deptid, gradeid, branchcode, employee_status, role, staff_type, bank_name, account_name, account_number)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING *`,
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
    const deletedStaff: Staff = await getConnection().query(`DELETE FROM staff_entity WHERE userid = $1`, [userId]);
    if (!deletedStaff[0].length) throw new HttpException(409, 'Staff does not exist');

    return deletedStaff[0];
  }
}
