import axios from 'axios';
import decodeJwt from 'jwt-decode';

import { AuthClient, CreateOptions, User } from '..';
import { AuthError } from './AuthError';

export function createAuthClient(options: CreateOptions): AuthClient {
  const axiosInstance = axios.create({
    baseURL: options.authServerUrl,
    withCredentials: true,
  });
  let token: string;
  return {
    async register(registerOptions) {
      try {
        const { data: user } = await axiosInstance.post<User>(
          '/auth/register',
          registerOptions,
        );
        return user;
      } catch (error) {
        throw new AuthError(error);
      }
    },
    async login(loginOptions) {
      try {
        const { data } = await axiosInstance.post<{
          accessToken: string;
        }>('/auth/login', loginOptions);

        token = data.accessToken;
        axiosInstance.defaults.headers.authorization = `Bearer ${data.accessToken}`;

        return data;
      } catch (error) {
        throw new AuthError(error);
      }
    },
    async getCurrentUser() {
      try {
        const jwtExpiresAt = decodeJwt<{ exp: number }>(token).exp;
        console.log(Date.now() >= jwtExpiresAt * 1000);
        if (Date.now() >= jwtExpiresAt * 1000) {
          // TODO: token has expired, call refresh
        }
        const { data: user } = await axiosInstance.get<User>('/users/me');

        return user;
      } catch (error) {
        throw new AuthError(error);
      }
    },
    async refresh() {
      try {
        const { data } = await axiosInstance.post<{ accessToken: string }>(
          '/auth/refresh',
        );

        return data;
      } catch (error) {
        throw new AuthError(error);
      }
    },
  } as AuthClient;
}
