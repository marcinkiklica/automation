import { APIRequestContext, test } from '@playwright/test';
import { ApiBuilder, ApiResponse } from './ApiBuilder';
import { IProduct, Product } from './models/Product';
import { ENDPOINTS } from './data/Endpoints';

export interface BodyGetAllProducts {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export class ProductsApiBuilder extends ApiBuilder {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllProducts(param?:string): Promise<ApiResponse<BodyGetAllProducts>> {    
    return await test.step('Get all products', async () => {
      const getAllProductsEndpoint = param? `${ENDPOINTS.PRODUCTS}?${param}`: ENDPOINTS.PRODUCTS;
      return await this.get<BodyGetAllProducts>(getAllProductsEndpoint);
    });
  }

  async getSingleProduct(index: number): Promise<ApiResponse<IProduct>>{
    return await test.step(`Get product with index ${index}`, async () => {
      return await this.get<IProduct>(ENDPOINTS.SINGLE_PRODUCT(index));
    });
  }

  async updateSingleProduct(index: number, payload: Product): Promise<ApiResponse<IProduct>> {
    return await test.step(`Update product with index ${index}`, async () => {
      return await this.put<IProduct>(ENDPOINTS.UPDATE_PRODUCT(index), payload);
    });
  }

  async createNewProduct(payload: Product): Promise<ApiResponse<IProduct>> {
    return await test.step('Create new product', async () => {
      return await this.post<IProduct>(ENDPOINTS.ADD_PRODUCT,payload);
    });
  }
}