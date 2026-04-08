import { Component, OnInit } from '@angular/core';
import { NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { CashStatus } from '@app/models/cash.model';
import { CashService } from '@app/services/cash.service';

@Component({
  selector: 'app-cash-management',
  standalone: true,
  imports: [NgIf, CurrencyPipe, DatePipe],
  template: `
    <div class="bg-white border rounded-lg p-4 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Gestión de Caja</h3>
        <div class="flex gap-2">
          <!-- Botón Abrir Caja -->
          <button
            *ngIf="!cashStatus?.cashOpen"
            (click)="openCash()"
            [disabled]="loading"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Abriendo...' : 'Abrir Caja' }}
          </button>

          <!-- Botón Cerrar Caja -->
          <button
            *ngIf="cashStatus?.cashOpen"
            (click)="closeCash()"
            [disabled]="loading"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Cerrando...' : 'Cerrar Caja' }}
          </button>

          <!-- Botón Refrescar -->
          <button
            (click)="refreshStatus()"
            [disabled]="loading"
            class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          >
            🔄
          </button>
        </div>
      </div>

      <!-- Estado de la Caja -->
      <div *ngIf="cashStatus; else loadingState" class="space-y-3">
        <!-- Caja Abierta -->
        <div *ngIf="cashStatus.cashOpen" class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-green-800">Caja Abierta</h4>
              <p class="text-sm text-green-600">
                Abierta el {{ cashStatus.data?.fechaApertura | date:'dd/MM/yyyy HH:mm' }}
              </p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-green-800">
                {{ cashStatus.data?.totalVentas | currency:'ARS':'symbol':'1.0-0' }}
              </div>
              <div class="text-sm text-green-600">
                {{ cashStatus.data?.cantidadVentas }} ventas realizadas
              </div>
            </div>
          </div>
        </div>

        <!-- Caja Cerrada -->
        <div *ngIf="!cashStatus.cashOpen" class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div class="text-center">
            <h4 class="font-medium text-gray-800">No hay caja abierta</h4>
            <p class="text-sm text-gray-600">Debe abrir una caja para comenzar a realizar ventas</p>
          </div>
        </div>

        <!-- Mensaje de error -->
        <div *ngIf="errorMessage" class="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <p class="text-base font-medium text-red-800">{{ errorMessage }}</p>
        </div>

        <!-- Mensaje de éxito -->
        <div *ngIf="successMessage" class="bg-green-50 border-2 border-green-300 rounded-lg p-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">✓</span>
            <p class="text-base font-medium text-green-800">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Estado de carga -->
      <ng-template #loadingState>
        <div class="flex items-center justify-center py-8">
          <div class="text-gray-500">Cargando estado de caja...</div>
        </div>
      </ng-template>
    </div>

    <!-- Modal de confirmación para cerrar caja -->
    <div *ngIf="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">¿Cerrar caja?</h3>
          <p class="text-gray-600 mb-2">¿Está seguro que desea cerrar la caja?</p>
          <div class="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
            <p class="text-sm text-blue-800">
              <span class="font-medium">Total de ventas:</span>
              {{ cashStatus?.data?.totalVentas || 0 | currency:'ARS':'symbol':'1.0-0' }}
            </p>
            <p class="text-sm text-blue-800">
              <span class="font-medium">Cantidad de ventas:</span>
              {{ cashStatus?.data?.cantidadVentas || 0 }}
            </p>
          </div>
          <p class="text-sm text-gray-500 mb-6">Esta acción no se puede deshacer.</p>

          <div class="flex gap-3 justify-end">
            <button
              (click)="cancelCloseCash()"
              class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button
              (click)="confirmCloseCash()"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Confirmar Cierre
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class CashManagementComponent implements OnInit {

  cashStatus: CashStatus | null = null;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  showConfirmModal: boolean = false;

  constructor(private cashService: CashService) {}

  ngOnInit(): void {
    // Cargar estado inicial
    this.loadCashStatus();
  }

  // Método simple para cargar el estado de la caja
  loadCashStatus(): void {
    this.loading = true;
    this.clearMessages();

    this.cashService.getCashStatus().subscribe({
      next: (status) => {
        this.cashStatus = status;
        this.loading = false;
        console.log('Estado de caja cargado:', status);
      },
      error: (error) => {
        console.error('Error loading cash status:', error);
        this.errorMessage = 'Error al cargar el estado de la caja';
        this.loading = false;
      }
    });
  }

  // Método simple para abrir la caja
  openCash(): void {
    this.loading = true;
    this.clearMessages();

    this.cashService.openCash().subscribe({
      next: (result) => {
        if (result.success) {
          this.successMessage = result.message;
          console.log('Caja abierta exitosamente');
          // Actualizar estado después de abrir
          setTimeout(() => {
            this.loadCashStatus();
          }, 500);
        } else {
          this.errorMessage = result.message;
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error opening cash:', error);
        this.errorMessage = error.error?.message || 'Error al abrir la caja';
        this.loading = false;
      }
    });
  }

  // Mostrar modal de confirmación
  closeCash(): void {
    this.showConfirmModal = true;
  }

  // Cancelar cierre de caja
  cancelCloseCash(): void {
    this.showConfirmModal = false;
  }

  // Confirmar cierre de caja
  confirmCloseCash(): void {
    this.showConfirmModal = false;
    this.loading = true;
    this.clearMessages();

    this.cashService.closeCash().subscribe({
      next: (result) => {
        if (result.success) {
          // Formatear el total como moneda
          const totalFormatted = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(result.data?.totalVentas || 0);

          this.successMessage = `Caja cerrada correctamente. Total de ventas: ${totalFormatted}`;
          console.log('Caja cerrada exitosamente');

          // Actualizar estado después de cerrar
          setTimeout(() => {
            this.loadCashStatus();
          }, 500);
        } else {
          this.errorMessage = result.message;
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error closing cash:', error);
        this.errorMessage = error.error?.message || 'Error al cerrar la caja';
        this.loading = false;
      }
    });
  }

  // Método simple para refrescar el estado
  refreshStatus(): void {
    console.log('Refrescando estado de caja...');
    this.loadCashStatus();
  }

  // Método para limpiar mensajes
  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
