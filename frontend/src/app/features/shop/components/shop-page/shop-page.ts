import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  imports: [FormsModule], // for ngModel
  selector: 'app-shop-page',
  styleUrl: './shop-page.css',
  templateUrl: './shop-page.html',
})
export class ShopPage implements OnInit, OnDestroy {
  // Products
  products: Product[] = [];
  loading = true; // if / else
  expandedId: number | null = null; // toggle (which product is open)

  // Cart
  showCart = false; // hide / show

  // Login
  username = '';
  password = '';
  showPassword = false; // toggle
  isLoggedIn = false; // if / else
  private timerId: any;

  // Reviews
  reviews: string[] = [];

  // Lifecycle hook: runs once when the component starts
  ngOnInit() {
    // setTimeout pretends to be a slow backend call
    console.log('shop created');
    this.timerId = setTimeout(() => {
      this.products = [
        { id: 1, name: 'Notebook', price: 5, description: 'A5 size, 100 pages', qty: 0 },
        { id: 2, name: 'Pen', price: 2, description: 'Blue ink, 0.7 mm', qty: 0 },
        { id: 3, name: 'Backpack', price: 30, description: 'Waterproof, 20 liters', qty: 0 },
      ];
      this.loading = false;
    }, 1000);
  }

  // Quantity (your counter logic)
  increase(product: Product) {
    product.qty++;
  }

  decrease(product: Product) {
    if (product.qty > 0) {
      product.qty--;
    }
  }

  // Values calculated from the state (not saved separately)
  get cartItems(): Product[] {
    return this.products.filter((p) => p.qty > 0);
  }

  get total(): number {
    return this.cartItems.reduce((sum, p) => sum + p.price * p.qty, 0);
  }

  // Toggles
  toggleDetails(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Login
  login() {
    if (this.username.trim() && this.password) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.password = '';
    this.username = '';
  }

  // Reviews (the value comes from a template reference)
  addReview(text: string) {
    if (text.trim()) {
      this.reviews.push(text);
    }
  }

  ngOnDestroy() {
    console.log('shop destroyed');
    clearTimeout(this.timerId); // cancel the timer if the user leaves early
  }
}
