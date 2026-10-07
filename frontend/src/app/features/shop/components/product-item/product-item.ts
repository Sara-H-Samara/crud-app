import { Component, Input, input, output, signal } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  imports: [],
  selector: 'app-product-item',
  styleUrl: './product-item.css',
  templateUrl: './product-item.html',
})
export class ProductItem {
  product = input.required<Product>();

  // @Input({ required: true })  //Old style
  // product!: Product;

  qtyChange = output<{ id: number; qty: number }>();

  //@Output()
  // qtyChange = new EventEmitter<{ id: number; qty: number }>();

  showDetails = signal(false);

  increase() {
    this.qtyChange.emit({ id: this.product().id, qty: this.product().qty + 1 });
  }

  decrease() {
    if (this.product().qty > 0) {
      this.qtyChange.emit({ id: this.product().id, qty: this.product().qty - 1 });
    }
  }

  toggleDetails() {
    this.showDetails.update((value) => !value);
  }
}
