import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductItem } from './product-item/product-item';
import { LoginBox } from './login-box/login-box';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Highlight } from '../../../../shared/directives/highlight';

@Component({
  imports: [ProductItem, LoginBox, CurrencyPipe, DatePipe, Highlight],
  selector: 'app-shop-page',
  styleUrl: './shop-page.css',
  templateUrl: './shop-page.html',
})
export class ShopPage implements OnInit, OnDestroy {
  products = signal<Product[]>([]);
  loading = signal(true);
  showCart = signal(false);
  username = signal<string | null>(null);
  reviews = signal<{ text: string; time: Date }[]>([]);

  private timerId: any;

  // values calculated from other signals
  isLoggedIn = computed(() => this.username() !== null);
  cartItems = computed(() => this.products().filter((product) => product.qty > 0));
  total = computed(() =>
    this.cartItems().reduce((sum, product) => sum + product.price * product.qty, 0),
  );

  ngOnInit() {
    this.timerId = setTimeout(() => {
      this.products.set([
        { id: 1, name: 'Notebook', price: 5, description: 'A5 size, 100 pages', qty: 0 },
        { id: 2, name: 'Pen', price: 2, description: 'Blue ink, 0.7 mm', qty: 0 },
        { id: 3, name: 'Backpack', price: 30, description: 'Waterproof, 20 liters', qty: 0 },
      ]);
      this.loading.set(false);
    }, 1000);
  }

  ngOnDestroy() {
    clearTimeout(this.timerId);
  }

  // the parent DECIDES when a child sends a message
  updateQty(change: { id: number; qty: number }) {
    this.products.update((list) =>
      list.map((product) => (product.id === change.id ? { ...product, qty: change.qty } : product)),
    );
  }

  onLogin(name: string) {
    this.username.set(name);
  }

  onLogout() {
    this.username.set(null);
  }

  toggleCart() {
    this.showCart.update((value) => !value);
  }

  addReview(text: string) {
    if (text.trim()) {
      this.reviews.update((list) => [...list, { text: text.trim(), time: new Date() }]);
    }
  }
}
