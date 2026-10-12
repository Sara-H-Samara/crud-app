import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ProductForm } from './product-form/product-form';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../../../core/services/auth';
import { ProductItem } from './product-item/product-item';
import { LoginBox } from './login-box/login-box';
import { Highlight } from '../../../../shared/directives/highlight';

@Component({
  imports: [ProductItem, LoginBox, CurrencyPipe, DatePipe, Highlight, ProductForm],
  selector: 'app-shop-page',
  styleUrl: './shop-page.css',
  templateUrl: './shop-page.html',
})
export class ShopPage implements OnInit, OnDestroy {
  // Dependency Injection: Angular hands us the shared instances
  protected readonly productService = inject(ProductService);
  protected readonly cart = inject(CartService);
  protected readonly auth = inject(AuthService);

  // state that belongs ONLY to this page stays here
  loading = signal(true);
  showCart = signal(false);
  reviews = signal<{ text: string; time: Date }[]>([]);

  private timerId: any;

  ngOnInit() {
    // fake a short loading time (lifecycle hook practice from Day 13)
    this.timerId = setTimeout(() => this.loading.set(false), 1000);
  }

  ngOnDestroy() {
    clearTimeout(this.timerId);
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
