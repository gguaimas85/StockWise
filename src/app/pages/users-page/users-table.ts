import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/userService';
import { changePasswordObj } from '@app/models/user.model';
import { Role } from '@app/enums/rolesEnum';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.html',
  styleUrls: ['./users-table.css'],
})
export class UsersTable implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.cdRef.detectChanges();
      },
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que querés eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert('Usuario eliminado');
          this.cargarUsuarios();
        },
        error: (err) => alert('Error al eliminar: ' + (err.error?.message || err.message)),
      });
    }
  }
  cambiarPass(id: number) {
    const oldPassword = prompt('Ingresá la contraseña actual del usuario:');
    if (!oldPassword) return;

    const newPassword = prompt('Ingresá la NUEVA contraseña:');
    if (!newPassword) return;

    const passwords: changePasswordObj = { oldPassword, newPassword };

    this.userService.changePassword(id, passwords).subscribe({
      next: () => alert('Contraseña actualizada exitosamente'),
      error: (err) => alert('Error al cambiar pass: ' + (err.error?.message || err.message)),
    });
  }
  crearUsuario() {
    const nombre_completo = prompt('Nombre completo:');
    const mail = prompt('Email:');
    const contraseña = prompt('Contraseña:');
    const rol = prompt('Rol (ADMIN o EMPLEADO):', 'EMPLEADO');

    if (nombre_completo && mail && contraseña && rol) {
      const newUser = {
        nombre_completo,
        mail,
        rol: rol === 'ADMIN' ? Role.ADMIN : Role.EMPLOYEE,
        contraseña,
      };

      this.userService.createNewUser(newUser).subscribe({
        next: () => {
          alert('Usuario creado con éxito');
          this.cargarUsuarios();
        },
        error: (err) => alert('Error al crear: ' + (err.error?.message || err.message)),
      });
    }
  }
}
