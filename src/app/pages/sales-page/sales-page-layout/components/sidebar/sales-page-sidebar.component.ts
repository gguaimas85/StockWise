import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CashService } from '@app/services/cash.service';
import { CashStatus } from '@app/models/cash.model';

@Component({
  selector: 'sales-page-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, CurrencyPipe],
  templateUrl: './sales-page-sidebar.component.html',
  styleUrl: './sales-page-sidebar.component.css',
})
export class SalesPageSidebarComponent implements OnInit {
  private readonly cashService = inject(CashService);

  cashStatus = signal<CashStatus | null>(null);
  loading = signal(false);
  showConfirmModal = signal(false);

  ngOnInit(): void {
    this.loadCashStatus();
  }

  loadCashStatus(): void {
    this.loading.set(true);

    this.cashService.getCashStatus().subscribe({
      next: (status) => {
        this.cashStatus.set(status);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading cash status:', error);
        this.loading.set(false);
      }
    });
  }

  onCashAction(): void {
    const status = this.cashStatus();
    if (!status) return;

    if (status.cashOpen) {
      this.closeCash();
    } else {
      this.openCash();
    }
  }

  openCash(): void {
    this.loading.set(true);

    this.cashService.openCash().subscribe({
      next: (result) => {
        if (result.success) {
          console.log('Caja abierta exitosamente');
          this.loadCashStatus();
        } else {
          console.error('Error:', result.message);
          this.loading.set(false);
        }
      },
      error: (error) => {
        console.error('Error opening cash:', error);
        this.loading.set(false);
      }
    });
  }

  closeCash(): void {
    // Actualizar estado antes de mostrar el modal
    this.loadCashStatus();
    setTimeout(() => {
      this.showConfirmModal.set(true);
    }, 100);
  }

  cancelCloseCash(): void {
    this.showConfirmModal.set(false);
  }

  confirmCloseCash(): void {
    this.showConfirmModal.set(false);
    this.loading.set(true);

    this.cashService.closeCash().subscribe({
      next: (result) => {
        if (result.success) {
          console.log('Caja cerrada exitosamente');
          this.loadCashStatus();
        } else {
          console.error('Error:', result.message);
          this.loading.set(false);
        }
      },
      error: (error) => {
        console.error('Error closing cash:', error);
        this.loading.set(false);
      }
    });
  }
}
