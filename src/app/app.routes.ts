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

  {path: 'pastries', loadComponent: () => import('./private/products/bolleria/pastries/pastries.component').then((m) => m.PastriesComponent)},

  {path: 'pastries-view', loadComponent: () => import('./private/products/bolleria/pastries-view/pastries-view.component').then((m) => m.PastriesViewComponent)},

  {path: 'pastries-in', loadComponent: () => import('./private/products/bolleria/pastries-in/pastries-in.component').then((m) => m.PastriesInComponent)},

  {path: 'fruits', loadComponent: () => import('./private/products/frutas_hortalizas/fruits/fruits.component').then((m) => m.FruitsComponent)},

  {path: 'fruits-view', loadComponent: () => import('./private/products/frutas_hortalizas/fruits-view/fruits-view.component').then((m) => m.FruitsViewComponent)},

  {path: 'fruits-in', loadComponent: () => import('./private/products/frutas_hortalizas/fruits-in/fruits-in.component').then((m) => m.FruitsInComponent)},

  {path: 'hygiene', loadComponent: () => import('./private/products/higiene/hygiene/hygiene.component').then((m) => m.HygieneComponent)},

  {path: 'hygiene-view', loadComponent: () => import('./private/products/higiene/hygiene-view/hygiene-view.component').then((m) => m.HygieneViewComponent)},

  {path: 'hygiene-in', loadComponent: () => import('./private/products/higiene/hygiene-in/hygiene-in.component').then((m) => m.HygieneInComponent)},

  {path: 'cleaning', loadComponent: () => import('./private/products/limpieza/cleaning/cleaning.component').then((m) => m.CleaningComponent)},

  {path: 'cleaning-view', loadComponent: () => import('./private/products/limpieza/cleaning-view/cleaning-view.component').then((m) => m.CleaningViewComponent)},

  {path: 'cleaning-in', loadComponent: () => import('./private/products/limpieza/cleaning-in/cleaning-in.component').then((m) => m.CleaningInComponent)},

  {path: 'misc', loadComponent: () => import('./private/products/varios/misc/misc.component').then((m) => m.MiscComponent)},

  {path: 'misc-view', loadComponent: () => import('./private/products/varios/misc-view/misc-view.component').then((m) => m.MiscViewComponent)},

  {path: 'misc-in', loadComponent: () => import('./private/products/varios/misc-in/misc-in.component').then((m) => m.MiscInComponent)},



];
