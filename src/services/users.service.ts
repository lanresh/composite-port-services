import { compare, hash } from 'bcrypt';
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Service } from 'typedi';
import { UsersEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';

@EntityRepository(UsersEntity)
export class UserService extends Repository<UsersEntity> {
  //   public async findAllUser(): Promise<User[]> {
  //     const users: User[] = await UserEntity.find();
  //     return users;
  //   }

  //   public async findUserById(userId: number): Promise<User> {
  //     const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //     if (!findUser) throw new HttpException(409, "User doesn't exist");

  //     return findUser;
  //   }

  public async createUser(userData: User): Promise<User> {
    const findUser: User[] = await getConnection().query('SELECT email FROM users_entity WHERE email = $1', [userData.email]);
    if (findUser.length) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User[] = await getConnection().query(
      'INSERT INTO users_entity(userid, email, username, password, menu_right, user_type, status, lastlogdate, pwd_status, pwd_date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        userData.userid,
        userData.email,
        userData.username,
        hashedPassword,
        userData.menu_right,
        userData.user_type,
        userData.status,
        userData.lastlogdate,
        userData.pwd_status,
        userData.pwd_date_created,
      ],
    );

    return createUserData[0];
  }

  public async updateUser(userData: User): Promise<User> {
    const findUser: User = await UsersEntity.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await UsersEntity.update({ email: userData.email }, { ...userData, password: hashedPassword });

    const updateUser: User = await UsersEntity.findOne({ where: { email: userData.email } });
    return updateUser;
  }

  public async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<User> {
    const findUser: User = await UsersEntity.findOne({ where: { userid: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const isPasswordMatching: boolean = await compare(oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Old Password not matching');

    const hashedPassword = await hash(newPassword, 10);
    await UsersEntity.update({ userid: userId }, { password: hashedPassword, pwd_status: 1 });

    const updateUser: User = await UsersEntity.findOne({ where: { userid: userId } });
    return updateUser;
  }

  //   public async deleteUser(userId: number): Promise<User> {
  //     const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //     if (!findUser) throw new HttpException(409, "User doesn't exist");

  //     await UserEntity.delete({ id: userId });
  //     return findUser;
  //   }
}
