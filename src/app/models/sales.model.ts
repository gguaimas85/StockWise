export type SaleStatus = 'Completed' | 'Cancelled' | 'Pending';

export interface Sale {
  id: number;
  number: string; // human friendly code
  date: string;   // ISO string
  amount: number; // total amount
  status: SaleStatus;
}

// Nuevo modelo para detalles de venta individual
export interface SaleDetail {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// Nuevo modelo para venta agrupada con detalles
export interface GroupedSale {
  id: string; // ID único para la transacción (puede ser timestamp o GUID)
  saleNumber: string; // Número de venta (V-0001, V-0002, etc.)
  date: string; // ISO string
  userId: number;
  userName?: string;
  totalAmount: number;
  itemCount: number; // Número total de artículos
  details: SaleDetail[];
  expanded?: boolean; // Para controlar si está expandida en la UI
}
