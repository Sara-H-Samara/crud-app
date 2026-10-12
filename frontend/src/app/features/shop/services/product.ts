import { Injectable, signal } from '@angular/core';

import { Product } from '../models/product';

/**
 * Knows WHERE products come from. Components only ask for them.
 * Today the list is in memory; on Day 18 it will come from the backend.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _products = signal<Product[]>([
    { id: 1, name: 'Notebook', price: 5, description: 'A5 size, 100 pages' },
    { id: 2, name: 'Pen', price: 2, description: 'Blue ink, 0.7 mm' },
    { id: 3, name: 'Backpack', price: 30, description: 'Waterproof, 20 liters' },
  ]);

  readonly products = this._products.asReadonly();
}
