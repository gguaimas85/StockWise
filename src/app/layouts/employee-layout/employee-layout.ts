import { Component, OnInit } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { Sidemenu } from '../../shared/sidemenu/sidemenu';
import { RouterOutlet } from '@angular/router';
import { Role } from '../../enums/rolesEnum';
import { ProfileService } from '@app/services/profile.service';

@Component({
  selector: 'app-employee-layout',
  imports: [Sidemenu, Header, Footer, RouterOutlet],
  templateUrl: './employee-layout.html',
  styleUrl: './employee-layout.css',
})
export class EmployeeLayout implements OnInit {
  employeeRole:Role = Role.EMPLOYEE;

    fullName: string = '';
  
    constructor(private profileService: ProfileService){}
    
    ngOnInit(): void {
      this.fullName = this.profileService.getUserFullName();
    }
}
