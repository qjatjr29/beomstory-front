import { AxiosInstance } from 'axios';
import { createInstance, auth, handleError, handleResponse } from './worker';

export class Api {
  private readonly API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT as string;
  protected baseInstance: AxiosInstance;
  protected authInstance: AxiosInstance;

  constructor() {
    const instance = createInstance(this.API_END_POINT);
    instance.interceptors.response.use(handleResponse, handleError);

    this.baseInstance = instance;
    this.authInstance = auth(instance);
  }
}

export { createInstance, auth, handleResponse, handleError };
