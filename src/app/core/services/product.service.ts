import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private storageKey = 'products';

  getProducts(): Product[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getProductById(id: number): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  }

  addProduct(product: Product): void {
    const products = this.getProducts();
    product.id = new Date().getTime();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  updateProduct(product: Product): void {
    const products = this.getProducts().map(p => p.id === product.id ? product : p);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  deleteProduct(id: number): void {
    const products = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}
