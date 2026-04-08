import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '@app/models/stock.model';

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly apiUrl = 'http://127.0.0.1:3000/api';
  private listeners: Function[] = [];
  currentStock: Stock[] = [];

  constructor(private http: HttpClient) {}

  loadStockList(): Observable<Stock[]> {
    console.log('Trayendo el stock de la base...');
    return this.http.get<Stock[]>(`${this.apiUrl}/stock`);
  }

  createProductStock(stockItem: Stock): Observable<Stock> {
    console.log('Creando nuevo registro de stock para el producto:', stockItem.ID_PRODUCTO);
    return this.http.post<Stock>(`${this.apiUrl}/stock`, { body: stockItem });
  }

  deleteProductStock(id: number): Observable<Stock> {
    console.log('Eliminando registro de stock de id:', id);
    return this.http.delete<Stock>(`${this.apiUrl}/stock/${id}`);
  }

  updateProductStock(stockItem: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/stock/${stockItem.ID}`, {
      body: stockItem,
    });
  }
}
