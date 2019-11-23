import { AxiosError } from 'axios';

export class AuthError extends Error {
  public httpStatus: number;
  public originalError: any;

  constructor(error: AxiosError) {
    if (error.isAxiosError && error.response && error.response.data.message) {
      super(error.response.data.message);
      this.httpStatus = error.response.status;
    } else {
      super(error.message);
      this.httpStatus = 0;
    }
    this.originalError = error;
  }
}
