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

  {path: 'main', loadComponent: () => import('./private/main/main.component').then((m) => m.MainComponent)},

  {path: 'meat', loadComponent: () => import('./private/products/carne/meat/meat.component').then((m) => m.MeatComponent)},

  {path: 'meat-view', loadComponent: () => import('./private/products/carne/meat-view/meat-view.component').then((m) => m.MeatViewComponent)},

  {path: 'meat-in', loadComponent: () => import('./private/products/carne/meat-in/meat-in.component').then((m) => m.MeatInComponent)},

  {path: 'drink', loadComponent: () => import('./private/products/bebidas/drink/drink.component').then((m) => m.DrinkComponent)},

  {path: 'drink-view', loadComponent: () => import('./private/products/bebidas/drink-view/drink-view.component').then((m) => m.DrinkViewComponent)},

  {path: 'drink-in', loadComponent: () => import('./private/products/bebidas/drink-in/drink-in.component').then((m) => m.DrinkInComponent)},

  {path: 'oil', loadComponent: () => import('./private/products/aceite/oil/oil.component').then((m) => m.OilComponent)},

  {path: 'oil-view', loadComponent: () => import('./private/products/aceite/oil-view/oil-view.component').then((m) => m.OilViewComponent)},

  {path: 'oil-in', loadComponent: () => import('./private/products/aceite/oil-in/oil-in.component').then((m) => m.OilInComponent)},



];
