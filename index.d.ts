export interface CreateOptions {
  authServerUrl: string;
}

export interface RegisterOptions {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginOptions {
  email: string;
  password: string;
}

export interface ChangePasswordOptions {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordOptions {
  email: string;
}

export interface ForgotPasswordSubmitOptions {
  email: string;
  code: number | string;
  password: string;
}

export interface GoogleLoginOptions {
  googleIdToken: string;
}

export class AuthClient {
  register(options: RegisterOptions): Promise<User>;
  login(options: LoginOptions): Promise<{ accessToken: string }>;
  refresh(): Promise<{ accessToken: string }>;
  logout(): Promise<{ ok: boolean }>;
  changePassword(options: ChangePasswordOptions): Promise<any>;
  forgotPassword(options: ForgotPasswordOptions): Promise<any>;
  forgotPasswordSubmit(options: ForgotPasswordSubmitOptions): Promise<any>;
  getCurrentUser(): Promise<User | null>;
  googleLogin(options: GoogleLoginOptions): Promise<{ accessToken: string }>;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export function createAuthClient(options: CreateOptions): AuthClient;
