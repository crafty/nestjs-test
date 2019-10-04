import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  fetchProducts() {
    // Not returning this.products, instead a new array with this.products spread into it
    // This is because this.products is a reference type
    // If you return that then you would be able to edit this.products from outside this class
    return [...this.products];
  }

  fetchProduct(productId: string) {
    const [product] = this.findProduct(productId);
    return product;
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);

    this.products[index] = {
      id: productId,
      title: title ? title : product.title,
      description: desc ? desc : product.description,
      price: price ? price : product.price,
    };

    return { ...this.products[index] };
  }

  deleteProduct(prodId: string) {
    const [product, index] = this.findProduct(prodId); // _ = a value you don't care about
    this.products.splice(index, 1);
    return [...this.products];
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return [product, productIndex];
  }
}
