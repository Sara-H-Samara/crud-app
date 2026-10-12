import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);

  // 1. THE FORM MODEL — created in TypeScript, not in HTML
  productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [1, [Validators.required, Validators.min(0.5), Validators.max(1000)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
  });

  // 2. A shortcut so the template can write f.name instead of productForm.controls.name
  protected get f() {
    return this.productForm.controls;
  }

  // 3. LIVE PREVIEW — valueChanges is an Observable; toSignal turns it into a signal
  preview = toSignal(this.productForm.valueChanges, {
    initialValue: this.productForm.getRawValue(),
  });

  lastAdded = signal<string | null>(null);

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product = this.productForm.getRawValue(); // { name, price, description }
    this.productService.add(product);

    this.lastAdded.set(product.name);
    this.productForm.reset(); // nonNullable → back to '', 1, '' (not null)
  }

  // 4. patchValue changes ONLY the fields you give it
  fillExample(): void {
    this.productForm.patchValue({ name: 'Ruler', price: 3 });
  }
}
