import { APIRequestContext } from '@playwright/test';


export interface ApiResponse<T> {
  status: number;
  body: T;
}

export class ApiBuilder {
  protected request: APIRequestContext;
  protected headers: { [key: string]: string; };
  protected body?: Object;
  protected status: number = 0;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.headers = {};
  }

  async setHeader(key: string, value: string){
    this.headers[key] = value;
  }

  async setBody(data: object) {
    this.body = data;
  }

  async get<T = any>(endpoint:string): Promise<ApiResponse<T>> {    
    console.log(`[GET] ${endpoint}`);

    try {
      const response = await this.request.get(endpoint);
      const body = await response.json();

      console.log(`[GET] ${endpoint} -> Status: ${response.status()}`);
      console.log(`[RESPONSE] ${JSON.stringify(body, null, 2)}`);
      return {
        status: response.status(),
        body: body as T
      };
    } catch (error) {
      console.error(`[GET] ${endpoint} failed:`, error);
      throw error;
    }
  }

  async put<T = any>(endpoint: string, data: object): Promise<ApiResponse<T>> {
    console.log(`[PUT] ${endpoint}`);
    console.log(`[REQUEST BODY] ${JSON.stringify(data, null, 2)}`);

    try {
      const response = await this.request.put(endpoint, {
        data: data,
      });
      const body = await response.json();

      console.log(`[PUT] ${endpoint} -> Status: ${response.status()}`);
      console.log(`[RESPONSE] ${JSON.stringify(body, null, 2)}`);

      return {
        status: response.status(),
        body: body as T,
      };
    } catch (error) {
      console.error(`[PUT] ${endpoint} failed:`, error);
      throw error;
    }
  }

  async post<T = any>(endpoint: string, data: object): Promise<ApiResponse<T>> {
    console.log(`[POST] ${endpoint}`);
    console.log(`[REQUEST BODY] ${JSON.stringify(data, null, 2)}`);

    try {
      const response = await this.request.post(endpoint, {
        data: data,
      });
      const body = await response.json();

      console.log(`[POST] ${endpoint} -> Status: ${response.status()}`);
      console.log(`[RESPONSE] ${JSON.stringify(body, null, 2)}`);

      return {
        status: response.status(),
        body: body as T,
      };
    } catch (error) {
      console.error(`[POST] ${endpoint} failed:`, error);
      throw error;
    }
  }
}