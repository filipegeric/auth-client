import { CreateOptions } from '..';
import { AuthClient } from './AuthClient';

export function createAuthClient(options: CreateOptions) {
  return new AuthClient(options.authServerUrl);
}

export { AuthClient };
