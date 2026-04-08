import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashHistory, CashOperation, CashStatus } from '@app/models/cash.model';



@Injectable({ providedIn: 'root' })
export class CashService {
  private readonly apiUrl = 'http://127.0.0.1:3000/api/cash';
  private currentCashStatus: CashStatus | null = null;
  private listeners: Function[] = [];

  constructor(private http: HttpClient) {
    this.loadCurrentCashStatus();
  }

  // Permite que un componente se suscriba para recibir notificaciones cuando cambie el estado de caja
  onCashStatusChange(callback: Function): void {
    this.listeners.push(callback);
  }

  // Permite que un componente se desuscriba de las notificaciones
  offCashStatusChange(callback: Function): void {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // Notifica a todos los componentes suscritos que el estado cambió
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }

  // Carga el estado inicial de la caja desde el servidor
  private loadCurrentCashStatus(): void {
    this.http.get<CashStatus>(`${this.apiUrl}/status`).subscribe({
      next: (status) => {
        this.currentCashStatus = status;
      },
      error: (error) => {
        console.error('Error cargando estado de caja:', error);
      }
    });
  }

  // Obtiene el estado actual de la caja desde el servidor
  getCashStatus(): Observable<CashStatus> {
    return new Observable(observer => {
      this.http.get<CashStatus>(`${this.apiUrl}/status`).subscribe({
        next: (status) => {
          this.currentCashStatus = status;
          observer.next(status);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  // Devuelve true si la caja está abierta, false si está cerrada
  isCashOpen(): boolean {
    return this.currentCashStatus?.cashOpen || false;
  }

  // Abre la caja registrando el empleado desde localStorage
  openCash(idEmpleado?: number): Observable<CashOperation> {
    let userId = idEmpleado;
    if (!userId) {
      const usuarioString = localStorage.getItem('usuario');
      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        userId = usuario.id;
      }
    }

    const body = userId ? { idEmpleado: userId } : {};

    return new Observable(observer => {
      this.http.post<CashOperation>(`${this.apiUrl}/open`, body).subscribe({
        next: (result) => {
          if (!this.currentCashStatus) {
            this.currentCashStatus = { success: true, cashOpen: true };
          } else {
            this.currentCashStatus.cashOpen = true;
          }
          this.notifyListeners();
          observer.next(result);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  // Cierra la caja registrando el empleado desde localStorage
  closeCash(): Observable<CashOperation> {
    let userId;
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      userId = usuario.id;
    }

    const body = userId ? { idEmpleado: userId } : {};

    return new Observable(observer => {
      this.http.post<CashOperation>(`${this.apiUrl}/close`, body).subscribe({
        next: (result) => {
          if (!this.currentCashStatus) {
            this.currentCashStatus = { success: true, cashOpen: false };
          } else {
            this.currentCashStatus.cashOpen = false;
          }
          this.notifyListeners();
          observer.next(result);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  // Actualiza el estado de caja manualmente
  refreshStatus(): void {
    this.loadCurrentCashStatus();
  }

  // Obtiene el historial de todas las cajas
  getCashHistory(): Observable<CashHistory> {
    return this.http.get<CashHistory>(`${this.apiUrl}/history`);
  }
}
