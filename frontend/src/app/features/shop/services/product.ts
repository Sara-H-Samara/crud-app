import { Injectable, signal } from '@angular/core';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private nextId = 4;

  private readonly _products = signal<Product[]>([
    { id: 1, name: 'Notebook', price: 5, description: 'A5 size, 100 pages' },
    { id: 2, name: 'Pen', price: 2, description: 'Blue ink, 0.7 mm' },
    { id: 3, name: 'Backpack', price: 30, description: 'Waterproof, 20 liters' },
  ]);

  readonly products = this._products.asReadonly();

  // Omit<Product, 'id'> = a Product WITHOUT the id; the service creates the id itself
  add(product: Omit<Product, 'id'>): void {
    this._products.update((list) => [...list, { id: this.nextId++, ...product }]);
  }
}
