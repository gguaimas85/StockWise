import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDB } from '@app/models/productDB.model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiURL = 'http://127.0.0.1:3000/api/products';

  constructor(private _httpClient: HttpClient) {}

  getAllProductsAPI(): Observable<ProductDB[]> {
    return this._httpClient.get<ProductDB[]>(this.apiURL);
  }

  updateProductStatusAPI(id: number) {
    return this._httpClient.delete<ProductDB[]>(`${this.apiURL}/${id}`);
  }

  udpateProductAPI(product: ProductDB) {
    let data = {
      NOMBRE: product.NOMBRE,
      CATEGORIA: product.CATEGORIA,
      DESCRIPCION: product.DESCRIPCION,
      PRECIO: product.PRECIO,
      ACTIVE: product.ACTIVE,
    };
    return this._httpClient.put<ProductDB>(`${this.apiURL}/${product.ID}`, data);
  }

  createProductAPI(product: any) {
    let newProduct = {
      NOMBRE: product.NOMBRE,
      CATEGORIA: product.CATEGORIA,
      DESCRIPCION: product.DESCRIPCION,
      PRECIO: product.PRECIO,
      ACTIVE: product.ACTIVE,
    };

    return this._httpClient.post<any>(`${this.apiURL}`, newProduct);
  }
}
