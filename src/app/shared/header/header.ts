import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Role } from '@app/enums/rolesEnum';
import { GearIcon, ProfileIcon, BellIcon, GetInIcon } from '@app/icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ProfileIcon, GetInIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  Role = Role; //Expone el enum al template
  @Input() fullName: string = 'sin nombre';

  @Input() role: Role = Role.ADMIN;
}
