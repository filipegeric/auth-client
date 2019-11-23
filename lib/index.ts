import axios from 'axios';

import { AuthClient, CreateOptions, User } from '..';

export function createAuthClient(options: CreateOptions): AuthClient {
  const axiosInstance = axios.create({
    baseURL: options.authServerUrl,
  });
  return {
    async register(registerOptions) {
      try {
        const { data: user } = await axiosInstance.post<User>(
          '/auth/register',
          registerOptions,
        );
        return user;
      } catch (error) {
        // TODO: throw app specific error
        throw error;
      }
    },
  } as AuthClient;
}
