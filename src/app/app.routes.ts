import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./private/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {path: 'products-in', loadComponent: () => import('./private/products-in/products-in.component').then((m) => m.ProductsInComponent)},

  {path: 'products-view', loadComponent: () => import('./private/products-view/products-view.component').then((m) => m.ProductsViewComponent)},

  {path: 'oil', loadComponent: () => import('./private/oil/oil.component').then((m) => m.OilComponent)},

  {path: 'main', loadComponent: () => import('./private/main/main.component').then((m) => m.MainComponent)},

  {path: 'meat', loadComponent: () => import('./private/products/carne/meat/meat.component').then((m) => m.MeatComponent)},

  {path: 'meat-view', loadComponent: () => import('./private/products/carne/meat-view/meat-view.component').then((m) => m.MeatViewComponent)},

  {path: 'meat-in', loadComponent: () => import('./private/products/carne/meat-in/meat-in.component').then((m) => m.MeatInComponent)}



];
