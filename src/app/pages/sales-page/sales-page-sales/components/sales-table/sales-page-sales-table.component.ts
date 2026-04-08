import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { Router } from '@angular/router';
import { SalesPageSalesService } from '@app/services';
import { GroupedSale } from '@app/models/sales.model';
import { CashService } from '@app/services/cash.service';

@Component({
  selector: 'sales-page-sales-table',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './sales-page-sales-table.component.html',
  styleUrl: './sales-page-sales-table.component.css'
})
export class SalesPageSalesTableComponent implements OnInit, OnDestroy {

  groupedSales: GroupedSale[] = [];
  cashIsOpen: boolean = false;

  // Guardar referencias a las funciones callback para poder limpiarlas
  private cashStatusCallback?: Function;
  private salesChangeCallback?: Function;

  constructor(
    private salesSvc: SalesPageSalesService,
    private cashService: CashService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Cargar estado inicial de la caja INMEDIATAMENTE desde el servicio (sincrónico)
    this.cashIsOpen = this.cashService.isCashOpen();
    console.log('Estado inicial de caja (sincrónico):', this.cashIsOpen ? 'Abierta' : 'Cerrada');

    // Cargar datos iniciales
    this.loadSalesData();

    // Verificar estado de la caja con el servidor para estar seguros
    this.cashService.getCashStatus().subscribe({
      next: (status) => {
        this.cashIsOpen = status.cashOpen;
        console.log('Estado confirmado desde servidor:', this.cashIsOpen ? 'Abierta' : 'Cerrada');
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error verificando estado de caja:', error);
        this.cashIsOpen = false;
        this.cdr.detectChanges();
      }
    });

    // Suscribirse a cambios de estado de caja (sistema simple)
    this.cashStatusCallback = () => {
      console.log('Estado de caja cambió, actualizando...');
      this.checkCashStatus();
      this.loadSalesData();
      // Forzar a Angular a detectar el cambio
      this.cdr.detectChanges();
    };
    this.cashService.onCashStatusChange(this.cashStatusCallback);

    // Suscribirse a cambios de ventas (sistema simple)
    this.salesChangeCallback = () => {
      console.log('Ventas cambiaron, recargando...');
      this.loadSalesData();
      // Forzar a Angular a detectar el cambio
      this.cdr.detectChanges();
    };
    this.salesSvc.onSalesChange(this.salesChangeCallback);
  }

  ngOnDestroy(): void {
    // Limpiar las suscripciones cuando el componente se destruye
    if (this.cashStatusCallback) {
      this.cashService.offCashStatusChange(this.cashStatusCallback);
    }
    if (this.salesChangeCallback) {
      this.salesSvc.offSalesChange(this.salesChangeCallback);
    }
    console.log('Componente de tabla destruido, listeners limpiados');
  }  // Método simple para cargar las ventas
  private loadSalesData(): void {
    console.log('Cargando ventas...');
    this.salesSvc.loadTodaySales().subscribe({
      next: (sales) => {
        this.salesSvc.updateSales(sales);
        this.groupedSales = this.salesSvc.getGroupedSales();
        console.log('Ventas cargadas:', this.groupedSales.length);
      },
      error: (error) => {
        console.error('Error cargando ventas:', error);
      }
    });
  }

  // Método simple para verificar estado de la caja (usa estado interno del servicio)
  private checkCashStatus(): void {
    // Usar el estado interno del servicio en lugar de hacer otra petición HTTP
    this.cashIsOpen = this.cashService.isCashOpen();
    console.log('Estado de caja:', this.cashIsOpen ? 'Abierta' : 'Cerrada');
  }

  onMakeSale() {
    // Verificar que la caja esté abierta antes de navegar
    if (!this.cashIsOpen || !this.cashService.isCashOpen()) {
      console.log('La caja está cerrada. No se puede realizar una venta.');
      return;
    }

    this.router.navigate(['/employee/sales/new']);
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
      minute: '2-digit'
    });
  }

  onCancelPrev() {
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'Completed': return 'Completada';
      case 'Cancelled': return 'Cancelada';
      case 'Pending': return 'Pendiente';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
