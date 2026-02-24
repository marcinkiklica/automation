import { test, expect } from '../Fixtures';
import { ApiResponse } from '../src/ApiBuilder';
import { Product, IProduct } from '../src/models/Product';
import { ProductList } from '../src/models/ProductList';
import { ProductBuilder } from '../src/builders/ProductBuilder';
import { BodyGetAllProducts } from '../src/ProductsApiBuilder';
import { faker } from '@faker-js/faker/locale/en';

test.describe('Tests for Products endpoint', () => {
  let responseGetAllProducts: ApiResponse<BodyGetAllProducts>;
  let responseProduct: ApiResponse<IProduct>;
  let newProductData: Product;
  let createdProduct: Product;

  test('Scenario 1: Get a list of all products', async ({ productsApiBuilder}) => {
    await test.step('Get a list of all products', async () => {
      responseGetAllProducts = await productsApiBuilder.getAllProducts();
      console.log(await responseGetAllProducts.body);
    });

    await test.step('Validate that request was successful', async () => {
      expect(responseGetAllProducts.status).toBe(200);

      expect(responseGetAllProducts.body.products.length).toBeGreaterThan(0);
      expect(responseGetAllProducts.body.total).toBeGreaterThan(0);
      expect(typeof responseGetAllProducts.body.skip).toBe('number');
      expect(typeof responseGetAllProducts.body.limit).toBe('number');
    });

    await test.step('Print titles of products with odd ID numbers to console or to test report', async () => {
      const productList = new ProductList(responseGetAllProducts.body.products);
      const oddIdProducts = productList.filterByOddIds();
      const logMessage = `Products with Odd IDs:\n${oddIdProducts.map((product) => `ID: ${product.id}, title: '${product.title}'`).join('\n')}`;
      console.log(logMessage);
      test.info().attach('Odd ID Products', {
        contentType: 'text/plain',
        body: logMessage,
      });
    });
  });
  
  test('Scenario 2: Create a new product', async ({productsApiBuilder}) => {
    await test.step('Create a new product with required properties: title, description, price, brand', async () => {
      newProductData = new ProductBuilder()
        .title(faker.commerce.productName())
        .brand(faker.company.name())
        .description(faker.commerce.productDescription())
        .price(parseFloat(faker.commerce.price({ min: 10, max: 1000 }).toString()))
        .build();

      responseProduct = await productsApiBuilder.createNewProduct(newProductData);
      createdProduct = new ProductBuilder()
        .setFromProductData(responseProduct.body)
        .build()
    });

    await test.step('Validate that the creation was successful', async () => {
      expect(responseProduct.status).toBe(201);
    });

    await test.step('Validate response data', async () => {
      expect(createdProduct).toHaveProperty('id');
      expect(createdProduct).toHaveProperty('title');
      expect(createdProduct).toHaveProperty('price');
      expect(createdProduct).toHaveProperty('description');
      expect(createdProduct).toHaveProperty('brand');
      expect(createdProduct.id).toBeGreaterThan(0);
      expect(createdProduct.title).toBe(newProductData.title);
      expect(createdProduct.brand).toBe(newProductData.brand);
      expect(createdProduct.description).toBe(newProductData.description);
      expect(createdProduct.price).toBe(newProductData.price);
    });
  });

  test('Scenario 3: Update third product', async ({ productsApiBuilder }) => {
    let updateData: Product;
    let originalProduct: Product;
    let updatedProduct: Product;

    await test.step('Get data for third product', async () => {
      responseProduct = await productsApiBuilder.getSingleProduct(3);
      expect(responseProduct.status).toBe(200);
      originalProduct = new ProductBuilder()
          .setFromProductData(responseProduct.body)
          .build();
    });

    await test.step('Update third product', async () => {
      const newTitle = faker.commerce.productName();
      const newDescription = faker.commerce.productDescription();
      const newPrice = parseFloat(faker.commerce.price({ min: 10, max: 1000 }).toString());
      
      updateData = new ProductBuilder().title(newTitle).description(newDescription).price(newPrice).build();
      responseProduct = await productsApiBuilder.updateSingleProduct(3, updateData);
    });

    await test.step('Validate that the update was successful', async () => {
      expect(responseProduct.status).toBe(200);
      updatedProduct = new ProductBuilder()
          .setFromProductData(responseProduct.body)
          .build();

      expect(updatedProduct.title).toBe(updateData.title);
    });

    await test.step('Validate that the response data matches the product data from step 1 where applicable', async () => {
      expect(updatedProduct.title).toBe(updateData.title);
      expect(updatedProduct.description).toBe(updateData.description);
      expect(updatedProduct.price).toBe(updateData.price);

      expect(updatedProduct.id).toBe(originalProduct.id);
      expect(updatedProduct.brand).toBe(originalProduct.brand);
      expect(updatedProduct.category).toBe(originalProduct.category);
      expect(updatedProduct.stock).toBe(originalProduct.stock);
      expect(updatedProduct.rating).toBe(originalProduct.rating);
      expect(updatedProduct.discountPercentage).toBe(originalProduct.discountPercentage);
      expect(updatedProduct.thumbnail).toBe(originalProduct.thumbnail);
      expect(updatedProduct.images).toEqual(originalProduct.images);
    });
  });
  
  [0, 5000, 6000].forEach(delay => {
    test(`Scenario 4: For ${delay}ms delay `, async ({ productsApiBuilder, performanceTimer,}) => {
      let responseTime: number;

      await test.step(`Get a list of products passing ‘delay’ query parameter with the parametrized value`, async () => {
        performanceTimer.start();
        responseGetAllProducts = await productsApiBuilder.getAllProducts(`delay=${delay}`);
        responseTime = performanceTimer.elapsed();
      });

      await test.step('Validate that the request was successful', async () => {
        expect(responseGetAllProducts.status).toBe(200);
        expect(responseGetAllProducts.body).toHaveProperty('products');
        expect(Array.isArray(responseGetAllProducts.body.products)).toBe(true);
        expect(responseGetAllProducts.body.products.length).toBeGreaterThan(0);
      });

      await test.step('Validate that the response time is no longer than `1000` milliseconds', async () => {
        expect(responseTime).toBeLessThanOrEqual(1000);
      });
    });
  });
});
