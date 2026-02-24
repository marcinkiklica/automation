import { ProductBuilder } from "../builders/ProductBuilder";
import { IProduct, Product } from "./Product";

export class ProductList {
  private products: Product[];

  constructor(productsData: IProduct[]) {
    this.products = productsData
      ? productsData.map(productData => new ProductBuilder()
        .setFromProductData(productData)
        .build()
      )
      : [];
  }

  getCount(): number {
    return this.products.length;
  }

  filterByOddIds(): Product[] {
    return this.products.filter(product => product.isOddId())
  }
}