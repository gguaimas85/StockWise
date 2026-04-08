import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDB } from '../models/productDB.model';

@Injectable({ providedIn: 'root' })
export class SalesPageProductsService {
  private readonly http = inject(HttpClient);
  private readonly _products = signal<ProductDB[]>([]);
  private readonly apiUrl = 'http://127.0.0.1:3000/api/products';

  products = this._products.asReadonly();

  loadProducts(): void {
    this.http.get<ProductDB[]>(this.apiUrl).subscribe({
      next: (data) => {
        this._products.set(data);
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this._products.set([]);
      }
    });
  }
}
