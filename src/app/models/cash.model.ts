export interface CashStatus {
  success: boolean;
  cashOpen: boolean;
  message?: string;
  data?: {
    id: number;
    fechaApertura: string;
    idEmpleado: number;
    totalVentas: number;
    cantidadVentas: number;
  };
}

export interface CashOperation {
  success: boolean;
  message: string;
  data?: any;
}

export interface CashHistory {
  success: boolean;
  data: Array<{
    ID: number;
    FECHA_APERTURA: string;
    FECHA_CIERRE?: string;
    MONTO_FINAL?: number;
    ID_EMPLEADO: number;
    EMPLEADO_NOMBRE?: string;
  }>;
}
