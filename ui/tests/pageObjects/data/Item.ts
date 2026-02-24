export class Item {
  id: string;
  name: string;
  description: string;
  price: string;

  constructor(id: string, name: string, description: string, price: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
  
  async toString(): Promise<string> {
    return `name: ${this.name}, Description: ${this.description}, Price: ${this.price}`;
  }
}