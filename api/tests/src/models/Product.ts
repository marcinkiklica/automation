export interface IDimensions {
  width?: number;
  height?: number;
  depth?: number;
}

export interface IReview {
  rating?: number;
  comment?: string;
  date?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface IMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface IProduct {
  id?: number;
  title: string;
  description: string;
  category?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  images?: string[];
  thumbnail?: string;
}

export class Product implements IProduct {
  id?: number;
  title: string;
  description: string;
  brand: string;
  price: number;
  discountPercentage?: number;
  category?: string;
  rating?: number;
  stock?: number;
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  images?: string[];
  thumbnail?: string;

  constructor(){
    this.title = '';
    this.description = '';
    this.brand = '';
    this.price = 0;
  }
 
  isOddId(): boolean {
    return this.id !== undefined && this.id % 2 !== 0;
  }
}

export class Dimensions {
  width?: number;
  height?: number;
  depth?: number;
}

export class Review implements IReview {
  rating?: number;
  comment?: string;
  date?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}

export class Meta {
  createdAt?: string;
  updatedAt?: string;
  barcode?: string;
  qrCode?: string;
}