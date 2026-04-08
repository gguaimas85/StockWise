import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupedSale } from '@app/models/sales.model';
import { Product, SaleItem } from '@app/models/product.model';

interface ProductDB {
  NOMBRE: string;
  DESCRIPCION?: string;
  CATEGORIA?: string;
  PRECIO: number;
  ID?: number;
  STOCK_SUCURSAL?: number;
}

@Injectable({ providedIn: 'root' })
export class SalesPageSalesService {

  private groupedSales: GroupedSale[] = [];
  private readonly apiUrl = 'http://127.0.0.1:3000/api/products';
  private readonly salesApiUrl = 'http://127.0.0.1:3000/api/sales';
  private listeners: Function[] = [];

  constructor(private http: HttpClient) {}

  // Permite que un componente se suscriba para recibir notificaciones de cambios en ventas
  onSalesChange(callback: Function): void {
    this.listeners.push(callback);
  }

  // Permite que un componente se desuscriba de las notificaciones
  offSalesChange(callback: Function): void {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // Notifica a todos los componentes suscritos que las ventas cambiaron
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }

  // Obtiene las ventas almacenadas en el servicio
  getGroupedSales(): GroupedSale[] {
    return this.groupedSales;
  }

  // Carga las ventas de la caja actual desde el servidor
  loadTodaySales(): Observable<GroupedSale[]> {
    return this.http.get<GroupedSale[]>(`${this.salesApiUrl}/today`);
  }

  getAllSales(): Observable<GroupedSale[]> {
    return this.http.get<GroupedSale[]>(`${this.salesApiUrl}`);
  }

  // Actualiza las ventas en el servicio
  updateSales(sales: GroupedSale[]): void {
    this.groupedSales = sales.map(sale => ({ ...sale, expanded: false }));
  }

  // Expande o contrae los detalles de una venta
  toggleSaleExpansion(saleId: string): void {
    this.groupedSales = this.groupedSales.map(sale =>
      sale.id === saleId
        ? { ...sale, expanded: !sale.expanded }
        : sale
    );
  }

  // Busca productos por nombre que tengan stock disponible
  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    return this.http.get<ProductDB[]>(`${this.apiUrl}?withStock=true`).pipe(
      map(products => {
        const lowerQuery = query.toLowerCase();
        const filtered: Product[] = [];

        products.forEach(p => {
          if (p.NOMBRE && p.NOMBRE.toLowerCase().startsWith(lowerQuery) && p.ID && p.ID > 0) {
            filtered.push({
              id: p.ID,
              name: p.NOMBRE,
              unitPrice: p.PRECIO || 0,
              imageUrl: '',
              stockSucursal: p.STOCK_SUCURSAL || 0
            });
          }
        });

        return filtered;
      })
    );
  }

  // Crea una nueva venta con el usuario logueado
  createOngoingSale(items: SaleItem[]): Observable<any> {
    let idUsuario = 6;
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      idUsuario = usuario.id;
    }

    const saleData = {
      idUsuario,
      items: items.map(item => ({
        idProducto: item.product.id,
        cantidad: item.quantity,
        precioUnitario: item.product.unitPrice
      }))
    };

    return this.http.post('http://127.0.0.1:3000/api/sales', saleData);
  }
}
