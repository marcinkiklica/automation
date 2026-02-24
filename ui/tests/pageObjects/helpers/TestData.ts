import { readFileSync } from "node:fs";
import { Item } from "../data/Item";
import { User } from "../data/User";

export class TestData {
  itemList: Item[];
  private userList: any;
  readonly users: { 
    standardUser: User;
    lockedOutUser: User;
    problemUser: User;
    performanceGlitchUser: User;
  };
  readonly items: {
    backpack: Item;
    bikeLight: Item;
    boltTShirt: Item;
    fleeceJacket: Item;
    onesie: Item;
    redTShirt: Item;
  };

  constructor() {
    this.itemList = this.getItemList();
    this.userList = this.getUserList();
    this.users = { 
      standardUser: this.getSingleUser("standard_user"),
      lockedOutUser: this.getSingleUser("locked_out_user"),
      problemUser: this.getSingleUser("problem_user"),
      performanceGlitchUser: this.getSingleUser("performance_glitch_user")
    };
    this.items = {
      backpack: this.itemList.find(item => item.name === "Sauce Labs Backpack")!,
      bikeLight: this.itemList.find(item => item.name === "Sauce Labs Bike Light")!,
      boltTShirt: this.itemList.find(item => item.name === "Sauce Labs Bolt T-Shirt")!,
      fleeceJacket: this.itemList.find(item => item.name === "Sauce Labs Fleece Jacket")!,
      onesie: this.itemList.find(item => item.name === "Sauce Labs Onesie")!,
      redTShirt: this.itemList.find(item => item.name === "Test.allTheThings() T-Shirt (Red)")!
    };
  }

  private getItemList(): Item[]  {
    const dir = 'tests/testData/items.json';
    const itemData = readFileSync(dir, 'utf-8');
    const items: Item[] = JSON.parse(itemData).map((item: any) => new Item(item.id, item.name, item.description, item.price));
    return items;
  }

  private getUserList(): any {
    const dir = 'tests/testData/users.json';
    const userData = readFileSync(dir, 'utf-8');
    return JSON.parse(userData);
  }

  private getSingleUser(username: string): User {
    const singleUser = this.userList.find((user: any) => user.username === username);
    if (singleUser) {
      return new User(singleUser.username, singleUser.login, singleUser.password);
    }
    throw new Error(`User with username "${username}" not found`);
  }
}