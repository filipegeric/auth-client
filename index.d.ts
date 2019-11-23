export interface CreateOptions {
  authServerUrl: string;
}

export interface AuthClient {
  register(options: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<User>;
  login(email: string, password: string): Promise<any>;
  refresh(): Promise<any>;
  logout(): Promise<any>;
  changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<any>;
  forgotPassword(email: string): Promise<any>;
  forgotPasswordSubmit(
    email: string,
    code: number | string,
    password: string,
  ): Promise<any>;
  getCurrentUser(): Promise<any>;
  googleLogin(googleIdToken: string): Promise<any>;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export function createAuthClient(options: CreateOptions): AuthClient;
