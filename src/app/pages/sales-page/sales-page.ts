import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { GroupedSale } from '@app/models/sales.model';
import { SalesPageSalesService } from '@app/services';

@Component({
  selector: 'app-sales-page',
  imports: [CommonModule],
  templateUrl: './sales-page.html',
  styleUrl: './sales-page.css',
})
export class SalesPage {
  groupedSales: GroupedSale[] = [];

  constructor(private salesSvc: SalesPageSalesService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSalesData();
    
  }

  private loadSalesData(): void {
    console.log('Cargando ventas...');
    this.salesSvc.getAllSales().subscribe({
      next: (sales) => {
        this.salesSvc.updateSales(sales);
        this.groupedSales = this.salesSvc.getGroupedSales();
        console.log('Ventas cargadas:', this.groupedSales.length);

        this.cdRef.detectChanges()
      },
      error: (error) => {
        console.error('Error cargando ventas:', error);
      },
    });
  }

  toggleSaleExpansion(saleId: string) {
    this.salesSvc.toggleSaleExpansion(saleId);
    this.groupedSales = this.salesSvc.getGroupedSales();
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
