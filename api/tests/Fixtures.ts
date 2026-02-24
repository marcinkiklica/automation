import { test as base } from '@playwright/test';
import { ProductsApiBuilder } from './src/ProductsApiBuilder';
import { PerformanceTimer } from './src/models/PerformanceTimer';


type MyFixtures = {
  productsApiBuilder: ProductsApiBuilder;
  performanceTimer: PerformanceTimer;
};

export const test = base.extend<MyFixtures>({
  productsApiBuilder: async ({ request }, use) => {
    const productsApiBuilder = new ProductsApiBuilder(request);
    await use(productsApiBuilder);
  }, 

  performanceTimer: async ({}, use) => {
    const timer = new PerformanceTimer();
    await use(timer);
  },
});

export { expect } from '@playwright/test';
