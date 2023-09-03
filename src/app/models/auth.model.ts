export interface IUserAuthInfo {
  email: string,
  password: string
}

export interface IAuthResponse {
  idToken: string,
  email: string,
  refreshToken:	string,
  expiresIn: string,
  localId: string
  registered?: boolean;
}

