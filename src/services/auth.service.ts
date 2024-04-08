import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { SECRET_KEY } from '@config';
import { UsersEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { Staff } from '@/interfaces/staff.interface';
import sendResetLink from '@/helpers/email.helper';

const createToken = (user: User, expiresIn: number = 6 * 60 * 60): TokenData => {
  const dataStoredInToken: DataStoredInToken = { userid: user.userid, id: user.id };
  const secretKey: string = SECRET_KEY;

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  // return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  return `${tokenData.token}`;
};

@EntityRepository(UsersEntity)
export class AuthService extends Repository<UsersEntity> {
  public async createUser(userId: string, userData): Promise<User> {
    const findUser: User[] = await getConnection().query('SELECT email FROM users_entity WHERE email = $1', [userData.email]);
    if (findUser.length) throw new HttpException(409, `This email ${userData.email} already exists`);
    let password: string;
    if (userData.password) {
      password = userData.password;
    } else {
      password = 'password';
    }
    let userType: string;
    if (userData.user_type) {
      userType = userData.user_type;
    } else {
      userType = 'Client';
    }

    const hashedPassword = await hash(password, 10);
    const createUserData: User = await getConnection().query(
      `INSERT INTO users_entity(userid, email, username, password, user_type, status, pwd_status, pwd_date_created) VALUES ($1, $2, $3, $4, 'Active', 0, now()) RETURNING *`,
      [userId, userData.email, userData.username, hashedPassword, userType],
    );

    return createUserData[0];
  }

  public async login(email: string, password: string): Promise<{ token: string; findUser: User }> {
    const findUser: User[] = await getConnection().query(`SELECT * FROM users_entity WHERE email = $1`, [email]);
    if (!findUser.length) throw new HttpException(409, `This email ${email} was not found`);

    const isPasswordMatching: boolean = await compare(password, findUser[0].password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const userData = await getConnection().query(`UPDATE users_entity SET lastlogdate = now() WHERE userid = $1 RETURNING *`, [findUser[0].userid]);

    const tokenData = createToken(userData[0][0]);
    const token = createCookie(tokenData);

    return { token, findUser: userData[0][0] };
  }

  public async logout(userId: string): Promise<string> {
    const findUser: User = await getConnection().query(`SELECT userid FROM users_entity WHERE userId = $1`, [userId]);
    // const findUser: User = await UserEntity.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const tokenData = createToken(findUser, 0);
    const token = createCookie(tokenData);

    return token;
  }

  public async forgotPassword(email: string, link: string): Promise<string> {
    const findUser: User[] = await getConnection().query(`SELECT userid, email FROM users_entity WHERE email = $1`, [email]);
    if (!findUser.length) throw new HttpException(409, `This email ${email} was not found`);

    const sent = await sendResetLink(email, link);
    if (sent) {
      return findUser[0].email;
    }

    return 'Invalid Details';
  }
}
