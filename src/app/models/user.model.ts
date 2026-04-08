import { Role } from '@app/enums/rolesEnum';

export interface User {
  ID?: number;
  NOMBRE_COMPLETO: string;
  MAIL: string;
  ROL: Role;
}

export interface newUser {
  nombre_completo: string;
  mail: string;
  rol: Role;
  contraseña: string;
}

export interface changePasswordObj {
  oldPassword: string;
  newPassword: string;
}

export interface UserApiResponse {
  message: string;
  result: {
    recordsets: string[];
    output: {};
    rowsAffected: number[];
  };
}
