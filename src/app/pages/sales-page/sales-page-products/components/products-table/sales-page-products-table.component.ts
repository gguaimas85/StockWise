import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesPageProductsService } from '../../../../../services/sales-page-products.service';

@Component({
  selector: 'sales-page-products-table',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, CommonModule],
  templateUrl: './sales-page-products-table.component.html',
  styleUrl: './sales-page-products-table.component.css',
})
export class SalesPageProductsTableComponent implements OnInit {
  private readonly productsSvc = inject(SalesPageProductsService);

  searchQuery = signal('');

  products = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const allProducts = this.productsSvc.products();

    if (!query) {
      return allProducts;
    }

    return allProducts.filter(product =>
      product.NOMBRE?.toLowerCase().includes(query) ||
      product.DESCRIPCION?.toLowerCase().includes(query) ||
      product.CATEGORIA?.toLowerCase().includes(query) ||
      (product.ACTIVE && 'activo'.includes(query)) ||
      (!product.ACTIVE && 'inactivo'.includes(query))
    );
  });

  ngOnInit(): void {
    this.productsSvc.loadProducts();
  }
}
