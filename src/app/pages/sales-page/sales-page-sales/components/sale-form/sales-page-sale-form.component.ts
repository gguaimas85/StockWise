import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Product, SaleItem } from '../../../../../models/product.model';
import { CashService } from '../../../../../services/cash.service';
import { SalesPageSalesService } from '@app/services';

@Component({
  selector: 'sales-page-sale-form',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CurrencyPipe],
  templateUrl: './sales-page-sale-form.component.html',
  styleUrl: './sales-page-sale-form.component.css'
})
export class SalesPageSaleFormComponent implements OnInit {

  searchQuery = '';
  suggestions: Product[] = [];
  items: SaleItem[] = [];
  cashIsOpen: boolean = true; // Si llegamos aquí, la caja está abierta

  constructor(
    private salesSvc: SalesPageSalesService,
    private cashService: CashService,
    private router: Router
  ) {}

  get totalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  ngOnInit(): void {
    // Ya no verificamos aquí, si llegamos al formulario la caja está abierta
    console.log('Formulario de venta cargado - Caja abierta');
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.suggestions = [];
      return;
    }

    this.salesSvc.searchProducts(this.searchQuery).subscribe({
      next: (products) => {
        this.suggestions = products.filter(p => p.id && p.id > 0);
      },
      error: (err) => {
        console.error('Error searching products:', err);
        this.suggestions = [];
      }
    });
  }

  onSelectProduct(product: Product) {
    const existingIndex = this.items.findIndex(item => item.product.id === product.id);

    if (existingIndex >= 0) {
      this.items[existingIndex].quantity++;
      this.items[existingIndex].subtotal = this.items[existingIndex].quantity * this.items[existingIndex].product.unitPrice;
    } else {
      const newItem: SaleItem = {
        product: {
          id: product.id,
          name: product.name,
          unitPrice: product.unitPrice,
          imageUrl: product.imageUrl
        },
        quantity: 1,
        subtotal: product.unitPrice
      };
      this.items.push(newItem);
    }

    this.searchQuery = '';
    this.suggestions = [];
  }

  increaseQty(index: number) {
    const item = this.items[index];
    item.quantity++;
    item.subtotal = item.quantity * item.product.unitPrice;
  }

  decreaseQty(index: number) {
    const item = this.items[index];
    if (item.quantity > 1) {
      item.quantity--;
      item.subtotal = item.quantity * item.product.unitPrice;
    } else {
      this.removeItem(index);
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  onCancelSale() {
    this.router.navigate(['/employee/sales']);
  }

  onFinishSale() {
    if (!this.items.length) {
      console.log('No hay productos en la venta');
      return;
    }

    console.log('Creando venta con items:', this.items);

    this.salesSvc.createOngoingSale(this.items).subscribe({
      next: (response) => {
        console.log('Venta creada exitosamente:', response);
        this.router.navigate(['/employee/sales']);
      },
      error: (err) => {
        console.error('Error al registrar la venta:', err);
        this.router.navigate(['/employee/sales']);
      }
    });
  }
}
