export interface User {
  id: number;
  userid: string;
  email: string;
  username: string;
  password: string;
  menu_right: string;
  user_type: string;
  status: string;
  lastlogdate: string;
  pwd_status: number;
  pwd_date_created: string;
  staff_type?: string;
}
