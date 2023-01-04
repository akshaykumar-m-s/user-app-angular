export interface User {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

export class UserData {
  id = '';
  avatar = '';
  first_name = '';
  last_name = '';
  email = '';
  username = '';
  password = '';
}
