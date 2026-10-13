import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  FormField,
  form,
  max,
  maxLength,
  min,
  minLength,
  required,
  submit,
} from '@angular/forms/signals';

import { ProductService } from '../../../services/product';

// the starting values, used for the first load AND for "Clear"
const EMPTY_PRODUCT = { name: '', price: 1, description: '' };

@Component({
  selector: 'app-product-form',
  imports: [FormField, CurrencyPipe],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private readonly productService = inject(ProductService);

  protected readonly productModel = signal({ ...EMPTY_PRODUCT });

  protected readonly productForm = form(this.productModel, (path) => {
    required(path.name, { message: 'Name is required.' });
    minLength(path.name, 2, { message: 'At least 2 characters.' });

    required(path.price, { message: 'Price is required.' });
    min(path.price, 0.5, { message: 'Minimum price is $0.50.' });
    max(path.price, 1000, { message: 'Maximum price is $1,000.00.' });

    required(path.description, { message: 'Description is required.' });
    maxLength(path.description, 100, { message: 'Maximum 100 characters.' });
  });

  protected readonly lastAdded = signal<string | null>(null);

  // 3. submit(): marks every field touched, runs the action only if the form is valid
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.productForm, async (field) => {
      const product = field().value(); // { name, price, description }
      this.productService.add(product);
      this.lastAdded.set(product.name);
      this.clear();
      return undefined;
    });
  }

  // 4. like patchValue: change ONLY name and price, keep the description
  fillExample(): void {
    this.productModel.update((current) => ({ ...current, name: 'Ruler', price: 3 }));
  }

  // back to the starting values AND untouched, so no errors show on the empty form
  clear(): void {
    this.productModel.set({ ...EMPTY_PRODUCT });
    this.productForm().reset();
  }
}
