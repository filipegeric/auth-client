import { CreateOptions } from '..';
import { AuthClient } from './AuthClient';

export async function createAuthClient(options: CreateOptions) {
  const authClient = new AuthClient(options.authServerUrl);
  try {
    await authClient.refresh();
    console.log('refreshed token');
  } catch (error) {}
  return authClient;
}

export { AuthClient };
