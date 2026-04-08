import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesPageSidebarComponent } from '../sidebar/sales-page-sidebar.component';

@Component({
  selector: 'sales-page-layout',
  standalone: true,
  imports: [RouterOutlet, SalesPageSidebarComponent],
  templateUrl: './sales-page-layout.component.html',
  styleUrl: './sales-page-layout.component.css',
})
export class SalesPageLayoutComponent {}
