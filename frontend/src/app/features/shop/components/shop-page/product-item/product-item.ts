import { Component, computed, inject, input, signal } from "@angular/core";
import { CurrencyPipe } from "@angular/common";

import { Product } from "../../../models/product";
import { CartService } from "../../../services/cart";
import { Truncate } from "../../../../../shared/pipes/truncate-pipe";

@Component({
  imports: [Truncate, CurrencyPipe],
  selector: "app-product-item",
  styleUrl: "./product-item.css",
  templateUrl: "./product-item.html",
})
export class ProductItem {
  // data still comes DOWN from the parent with an input...
  product = input.required<Product>();

  // ...but the cart is shared state, so the child uses the service directly
  // instead of emitting an output (the old `qtyChange`).
  private readonly cart = inject(CartService);

  qty = computed(() => this.cart.qtyOf(this.product().id));

  showDetails = signal(false);

  increase() {
    this.cart.add(this.product());
  }

  decrease() {
    this.cart.remove(this.product());
  }

  toggleDetails() {
    this.showDetails.update((value) => !value);
  }
}
