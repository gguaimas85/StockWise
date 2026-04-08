import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { EmployeeLayout } from './layouts/employee-layout/employee-layout';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage),
      },
      {
        path: 'sales',
        loadComponent: () => import('./pages/sales-page/sales-page').then(m => m.SalesPage),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products-page/products-page').then(m => m.ProductsPage),
      },
      {
        path: 'stock',
        loadComponent: () => import('./pages/stock-page/stock-page').then(m => m.StockPage),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users-page/users-table').then(m => m.UsersTable),
      },
      {
        path: 'cash-register',
        loadComponent: () => import('./pages/register-closings-page/register-closings-page').then(m => m.RegisterClosingsPage),
      },
    ],
  },
  {
    path: 'employee',
    component: EmployeeLayout,
    children: [
     {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage),
      },
      { 
        path: 'sales', 
        loadComponent: () => import('./pages/sales-page/sales-page-sales/components/sales-table/sales-page-sales-table.component').then(m => m.SalesPageSalesTableComponent),
      },
      { 
        path: 'sales/new', 
        loadComponent: () => import('./pages/sales-page/sales-page-sales/components/sale-form/sales-page-sale-form.component').then(m => m.SalesPageSaleFormComponent),
      },
      { 
        path: 'products', 
        loadComponent: () => import('./pages/sales-page/sales-page-products/components/products-table/sales-page-products-table.component').then(m => m.SalesPageProductsTableComponent),
      },
    ],
  },
  {path: '**', redirectTo: 'login'}
];
