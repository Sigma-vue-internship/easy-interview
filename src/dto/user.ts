export interface IUser {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IDBUser;
}

export interface IDBUser {
  id: number;
  roles_id: number;
  username: string;
  updated_at: string;
  createdAt: string;
}
