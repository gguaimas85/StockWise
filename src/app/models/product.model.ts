export interface Product {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl?: string; // opcional, placeholder si no existe
  stockSucursal?: number; // stock disponible en sucursal
}

export interface SaleItem {
  product: Product;
  quantity: number;
  subtotal: number; // quantity * unitPrice
}
