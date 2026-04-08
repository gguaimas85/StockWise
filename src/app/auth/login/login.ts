import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@app/services/profile.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario = new String();
  contra = new String();
  authA = new Array();

  constructor(private router: Router, private profileService: ProfileService) {}
  navegarHome() {
    if (this.profileService.hasRole()) {
      if (this.profileService.getCurrentRole() === 'ADMIN') this.router.navigate(['admin/home']);
      if (this.profileService.getCurrentRole() === 'EMPLEADO')
        this.router.navigate(['employee/home']);
    } else {
      console.log('Error al recuperar el rol del usuario');
    }
  }

  async authenticateUser() {
    try {
      const body = {
        email: this.usuario,
        contra: this.contra,
      };

      const res = await fetch(`http://127.0.0.1:3000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      console.log(data);

      if (this.usuario == data.user.MAIL && data.token) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem(
          'usuario',
          JSON.stringify({
            id: data.user.ID,
            nombre: data.user.NOMBRE_COMPLETO,
            email: data.user.MAIL,
            rol: data.user.ROL,
          })
        );
        localStorage.setItem('token', JSON.stringify(data.token));
        this.profileService.setRole(data.user.ROL);
        this.profileService.setUserFullName(data.user.NOMBRE_COMPLETO);
        this.profileService.setUserEmail(data.user.MAIL);
        console.log('Usuario guardado:', data.user.ID, data.user.NOMBRE_COMPLETO);
        this.navegarHome();
      } else {
        console.log('error logueando');
      }
    } catch (error) {
      console.log('Error durante el login:', error);
    }
  }
}
