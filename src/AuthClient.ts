import axios, { AxiosInstance } from 'axios';
import decodeJwt from 'jwt-decode';

import {
  ChangePasswordOptions,
  ForgotPasswordOptions,
  ForgotPasswordSubmitOptions,
  GoogleLoginOptions,
  LoginOptions,
  RegisterOptions,
  User,
} from '..';
import { AuthError } from './AuthError';

export class AuthClient {
  private axiosInstance: AxiosInstance;
  private accessToken: string;

  constructor(authServerUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: authServerUrl,
      withCredentials: true,
    });

    // TODO: call refresh
  }

  private setAccessToken(token: string) {
    this.accessToken = token;
    this.axiosInstance.defaults.headers.authorization = `Bearer ${token}`;
  }

  async register(registerOptions: RegisterOptions) {
    try {
      const { data: user } = await this.axiosInstance.post<User>(
        '/auth/register',
        registerOptions,
      );
      return user;
    } catch (error) {
      throw new AuthError(error);
    }
  }

  async login(loginOptions: LoginOptions) {
    try {
      const { data } = await this.axiosInstance.post<{
        accessToken: string;
      }>('/auth/login', loginOptions);

      this.setAccessToken(data.accessToken);

      return data;
    } catch (error) {
      throw new AuthError(error);
    }
  }

  async getCurrentUser() {
    try {
      const jwtExpiresAt = decodeJwt<{ exp: number }>(this.accessToken).exp;
      if (Date.now() >= jwtExpiresAt * 1000) {
        const { accessToken } = await this.refresh();
        this.setAccessToken(accessToken);
      }
      const { data: user } = await this.axiosInstance.get<User>('/users/me');

      return user;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError(error);
    }
  }

  async refresh() {
    try {
      const { data } = await this.axiosInstance.post<{ accessToken: string }>(
        '/auth/refresh',
      );

      return data;
    } catch (error) {
      throw new AuthError(error);
    }
  }

  async logout() {
    try {
      const res = await this.axiosInstance.post<{ ok: boolean }>(
        '/auth/logout',
      );

      return res.data;
    } catch (error) {
      throw new AuthError(error);
    }
  }

  async changePassword(options: ChangePasswordOptions) {
    try {
      const res = await this.axiosInstance.post<{ ok: boolean }>(
        '/auth/change-password',
        options,
      );

      return res.data;
    } catch (error) {
      throw new AuthError(error);
    }
  }

  async forgotPassword(options: ForgotPasswordOptions) {
    try {
      const res = await this.axiosInstance.post<{ ok: boolean }>(
        '/auth/forgot-password',
        options,
      );

      return res.data;
    } catch (error) {
      throw new AuthError(error);
    }
  }

  async forgotPasswordSubmit(options: ForgotPasswordSubmitOptions) {
    try {
      const res = await this.axiosInstance.post<{ ok: boolean }>(
        '/auth/forgot-password-submit',
        options,
      );

      return res.data;
    } catch (error) {
      throw new AuthError(error);
    }
  }

  async googleLogin(options: GoogleLoginOptions) {
    try {
      const res = await this.axiosInstance.post<{ accessToken: string }>(
        '/google/login',
        options,
      );

      this.setAccessToken(res.data.accessToken);

      return res.data;
    } catch (error) {
      throw new AuthError(error);
    }
  }
}
