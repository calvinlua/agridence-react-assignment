export interface User {
  username: string;
  password?: string;
}

export interface UserAuthentication {
  user: string;
  loggedIn: boolean;
}
