import { Injectable } from '@angular/core';
import { Role } from '@app/enums/rolesEnum';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userFullName: string = '';
  userEmail: string = '';
  userRole: Role | null = null;

  setRole(role: Role):void {
    console.log('-----', role)
    this.userRole = role;
  }

  getCurrentRole(): Role {
    return this.userRole!;
  }

  hasRole(): boolean {
    return !!this.userRole;
  }

  setUserFullName(fullName: string){
    this.userFullName = fullName;
  }

  setUserEmail(email: string){
    this.userEmail = email;
  }

  getUserEmail(){
    if(this.userEmail) return this.userEmail

    const usuarioLocalStorage = localStorage.getItem('usuario')
    return usuarioLocalStorage && JSON.parse(usuarioLocalStorage).email
  }
  getUserFullName(){
    if(this.userFullName) return this.userFullName

    const usuarioLocalStorage = localStorage.getItem('usuario')
    return usuarioLocalStorage && JSON.parse(usuarioLocalStorage).nombre
  }
}
