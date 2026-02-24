export const INVENTORY_PAGE_SELECTORS = {
  inventoryContainer: 'css=[data-test="inventory_container"]',
  inventoryItems: 'css=[data-test="inventory-item"]',
  itemNames: 'css=[data-test="inventory-item-name"]',
  itemDescriptions: 'css=[data-test="inventory-item-desc"]',
  itemPrices: 'css=[data-test="inventory-item-price"]',
  productSortDropdown: 'css=[data-test="active-option"]',
  productSortDropdownOption: 'css=select[data-test="product-sort-container"]',
  addItemToCartButtonSelector: 'css=[data-test^="add-to-cart-"]',
  addItemToCartButton: (value: string ) => `css=[data-test="inventory-list"] button[data-test$="-${value.toLowerCase()}"]`,
  removeItemFromCartButton: (value: string ) => `css=[data-test="inventory-list"] button[data-test="-${value.toLowerCase()}"]`
};