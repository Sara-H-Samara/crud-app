import { Injectable, computed, signal } from "@angular/core";

import { CartItem, Product } from "../models/product";

/**
 * Shared cart state. Because it is a root singleton:
 * - every ProductItem can add/remove items without going through the parent
 * - other components (like the top nav) can show the cart count
 * - the cart survives switching between the Users and Shop pages
 */
@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() =>
    this._items().reduce((sum, item) => sum + item.qty, 0),
  );
  readonly total = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.qty, 0),
  );

  qtyOf(productId: number): number {
    return (
      this._items().find((item) => item.product.id === productId)?.qty ?? 0
    );
  }

  add(product: Product): void {
    this.setQty(product, this.qtyOf(product.id) + 1);
  }

  remove(product: Product): void {
    this.setQty(product, this.qtyOf(product.id) - 1);
  }

  clear(): void {
    this._items.set([]);
  }

  private setQty(product: Product, qty: number): void {
    this._items.update((items) => {
      const others = items.filter((item) => item.product.id !== product.id);
      if (qty <= 0) {
        return others;
      }
      const exists = items.some((item) => item.product.id === product.id);
      return exists
        ? items.map((item) =>
            item.product.id === product.id ? { ...item, qty } : item,
          )
        : [...items, { product, qty }];
    });
  }
}
