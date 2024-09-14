export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  username: string;
  email: string;
  password?: string;
}

export interface PasswordHash {
  hash: string;
  salt: string;
}
export interface ILoginCredentials {
  email: string;
  password: string;
}
