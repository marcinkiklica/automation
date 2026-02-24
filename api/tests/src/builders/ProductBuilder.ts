import { Dimensions as IDimensions, IProduct, Meta, Product, Review } from '../models/Product';

export class ProductBuilder {
  private product: Product;

  constructor() {
    this.product = new Product();
  }

  setFromProductData(productData: IProduct): this {
    if (productData) this.id(productData.id);
    if (productData.title) this.title(productData.title);
    if (productData.description) this.description(productData.description);
    if (productData.price) this.price(productData.price);
    if (productData.brand) this.brand(productData.brand);
    if (productData.discountPercentage) this.discountPercentage(productData.discountPercentage);
    if (productData.stock) this.stock(productData.stock);
    if (productData.rating) this.rating(productData.rating);
    if (productData.images) this.images(productData.images);
    if (productData.thumbnail) this.thumbnail(productData.thumbnail);
    if (productData.category) this.category(productData.category);
    if (productData.tags) this.tags(productData.tags);
    if (productData.sku) this.sku(productData.sku);
    if (productData.weight) this.weight(productData.weight);
    if (productData.dimensions) this.dimensions(productData.dimensions); 
    if (productData.warrantyInformation) this.warrantyInformation(productData.warrantyInformation);
    if (productData.shippingInformation) this.shippingInformation(productData.shippingInformation);
    if (productData.availabilityStatus) this.availabilityStatus(productData.availabilityStatus);
    if (productData.reviews) this.reviews(productData.reviews);
    if (productData.returnPolicy) this.returnPolicy(productData.returnPolicy);
    if (productData.minimumOrderQuantity) this.minimumOrderQuantity(productData.minimumOrderQuantity);
    if (productData.meta) this.meta(productData.meta);
    return this;
  }

  tags(value: string[]) {
    this.product.tags = value;
    return this;
  }

  sku(value: string) {
    this.product.sku = value;
    return this;
  }
  weight(value: number) {
    this.product.weight = value;
    return this;
  }
  
  dimensions(dimensions: IDimensions ) {
    const dims = new IDimensions();
    if(dimensions.width) dims.width = dimensions.width;
    if(dimensions.height) dims.height = dimensions.height;
    if(dimensions.depth) dims.depth = dimensions.depth;
    this.product.dimensions = dims;
    return this;
  }

  warrantyInformation(value: string) {
    this.product.warrantyInformation  = value;
    return this;
  }

  shippingInformation(value: string) {
    this.product.shippingInformation = value;
    return this;
  }

  availabilityStatus(value: string) {
    this.product.availabilityStatus = value;
    return this;
  }

  reviews(reviews: Review[]) {
    const reviewInstances = reviews.map(review => {
      const reviewInstance = new Review();
      if(review.rating) reviewInstance.rating = review.rating;
      if(review.comment) reviewInstance.comment = review.comment;
      if(review.date) reviewInstance.date = review.date;
      if(review.reviewerName) reviewInstance.reviewerName = review.reviewerName;
      if(review.reviewerEmail) reviewInstance.reviewerEmail = review.reviewerEmail;
      return reviewInstance;
    });
    this.product.reviews = reviewInstances;
    return this;
  }

  returnPolicy(value: string): this {
    this.product.returnPolicy = value;
    return this;
  }
  
  minimumOrderQuantity(value: number):this {
    this.product.minimumOrderQuantity = value;
    return this;
  }

  meta(meta: Meta): this {
    const metaInstance = new Meta();
    if(meta.createdAt) metaInstance.createdAt = meta.createdAt;
    if(meta.updatedAt) metaInstance.updatedAt = meta.updatedAt;
    if(meta.barcode) metaInstance.barcode = meta.barcode;
    if(meta.qrCode) metaInstance.qrCode = meta.qrCode;
    this.product.meta = metaInstance;
    return this;
  }

  id(value: number | undefined): this {
    if(value !== undefined) {
      this.product.id = value;
    }
    return this;
  }

  title(value: string): this {
    this.product.title = value;
    return this;
  }

  description(value: string): this {
    this.product.description = value;
    return this;
  }

  price(value: number): this {
    this.product.price = value;
    return this;
  }

  brand(value: string): this {
    this.product.brand = value;
    return this;
  }
  
  discountPercentage(value: number): this {
    this.product.discountPercentage = value;
    return this;
  }

  stock(value: number): this {
    this.product.stock = value;
    return this;
  }

  rating(value: number): this {
    this.product.rating = value;
    return this;
  }

  images(value: string[]): this {
    this.product.images = value;
    return this;
  }

  thumbnail(value: string): this {
    this.product.thumbnail = value;
    return this;
  }

  category(value: string): this {
    this.product.category = value;
    return this;
  }

  build(): Product {
    return this.product;
  }
}
