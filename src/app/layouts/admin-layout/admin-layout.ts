import { Component, OnInit } from '@angular/core';
import { Sidemenu } from '../../shared/sidemenu/sidemenu';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { RouterOutlet } from '@angular/router';
import { Role } from '../../enums/rolesEnum';
import { ProfileService } from '@app/services/profile.service';

@Component({
  selector: 'app-admin-layout',
  imports: [Sidemenu, Header, Footer, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit {
  adminRole:Role = Role.ADMIN;
  fullName: string = '';

  constructor(private profileService: ProfileService){}
  
  ngOnInit(): void {
    this.fullName = this.profileService.getUserFullName();
  }
  
}
