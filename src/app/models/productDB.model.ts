export interface ProductDB {
  ID: number;
  NOMBRE: string;
  DESCRIPCION?: string;
  CATEGORIA?: string;
  PRECIO: number;
  ACTIVE: boolean; //  (true = Activo, false = Inactivo)
}
