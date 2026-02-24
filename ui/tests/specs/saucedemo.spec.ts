import { expect } from '@playwright/test';
import { test } from '../fixures';
import { Item } from '../pageObjects/data/Item';

test.describe('Standard User Tests', () => {

  test.beforeEach(async ({ loginPage, testData }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.logIn(testData.users.standardUser);
  });

  test('Scenario_1', async ({ inventoryPage, testData, cartPage, checkoutPage }) => {
    let itemList = testData.itemList;
    await test.step('Add all item to the car', async () => {
      await inventoryPage.addItemsToCart(itemList.map(item => item.id));
    }); 
    await test.step('Go to the cart', async () => {
      inventoryPage.clickShoppingCartButton();
    });

    await test.step('Remove third item from cart', async () => {
      await cartPage.clickRemoveButton(3);
      itemList.splice(2, 1); 
    });

    await test.step('Validate in the Checkout Overview that it only contains the items that you want to purchase, as well as the total count of items', async () => {
      const cartItems: Item[] = await cartPage.getAllItemsInCart();
      await expect(cartItems.length, `Number of items in the cart does not match expected value ${itemList.length}`).toEqual(itemList.length);

      for (const item of itemList) {
        const matchingCartItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (matchingCartItem) {
          await expect.soft(matchingCartItem.name, `Item name for ${item.name} does not match expected value ${matchingCartItem.name}`).toEqual(item.name);
          await expect.soft(matchingCartItem.description, `Item description for ${item.name} does not match expected value ${matchingCartItem.description}`).toEqual(item.description);
          await expect.soft(matchingCartItem.price, `Item price for ${item.name} does not match expected value ${matchingCartItem.price}`).toEqual(item.price);
        }
        else {
          await expect.soft(matchingCartItem, `Item ${item.name} is missing from the cart`).toBeTruthy();
        }
      }
    });

    await test.step('Finish the purchase', async () => {
      await cartPage.clickCheckoutButton();
      await checkoutPage.fillCheckoutInformation("firstName", "lastName", "zipCode");
      await checkoutPage.clickContinueButton();     
      await checkoutPage.clickFinishButton();
    });

    await test.step('Validate that the website confirms the order', async () => {
      await expect(checkoutPage.checkoutPageLocators.orderConfirmationHeader).toHaveText('Thank you for your order!');
      await expect(checkoutPage.checkoutPageLocators.orderConfirmationText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });
  });
  
  test('Scenario_3', async ({ inventoryPage, testData }) => {
    await test.step('Sort products by name', async () => {
      await inventoryPage.sortProductsByName("Name (Z to A)");
    });

    await test.step('Validate that items sorted as expected', async () => {
    let itemList = testData.itemList;
      itemList.sort((a, b) => b.name.localeCompare(a.name));
      const inventoryItems = await inventoryPage.getAllItemsNamesInInventory();
      for (let i = 0; i < itemList.length; i++) {
        const expectedItemName = itemList[i].name;
        const actualItemName = inventoryItems[i];
        await expect.soft(actualItemName, `Item name at position ${i} does not match expected value ${expectedItemName}, Current value: ${actualItemName}`).toEqual(expectedItemName);
      }
    });
  });
});

test.describe('Problem User Tests', () => {

  test('Scenario_2', async ({ loginPage, inventoryPage, testData, inventoryItemPage, cartPage }) => {
    let singleItem = testData.items.boltTShirt;

    await test.step('Log in as a `problem_user`', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.logIn(testData.users.problemUser);
    });

    await test.step('Find one item by name, click on the item', async () => {
      await inventoryPage.openItemByName(singleItem.name);
    }); 

    await test.step('Add it to the cart from item page', async () => {
      await inventoryItemPage.clickAddToCartButton();
    });

    await test.step('Go to the cart', async () => {
      await inventoryItemPage.clickShoppingCartButton();
    });

    await test.step('Validate that item was added', async () => {
      const cartItems: Item[] = await cartPage.getAllItemsInCart();
      await expect(cartItems.length).toEqual(1);
      const matchingCartItem = cartItems[0];
      await expect.soft(matchingCartItem.name, `Item name for ${singleItem.name} does not match expected value ${matchingCartItem.name}`).toEqual(singleItem.name);
      await expect.soft(matchingCartItem.description, `Item description for ${singleItem.name} does not match expected value ${matchingCartItem.description}`).toEqual(singleItem.description);
      await expect.soft(matchingCartItem.price, `Item price for ${singleItem.name} does not match expected value ${matchingCartItem.price}`).toEqual(singleItem.price);
    });
  });
});


test.describe('Locked out_user Tests', () => {
  test('Scenario_4', async ({ loginPage, testData}) => {
    await test.step('Log in as a `locked_out_user`', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.logIn(testData.users.lockedOutUser);
    });

    await test.step('Validate that login failed', async () => {
      await expect(loginPage.loginPageLocators.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    }); 
  });
});



