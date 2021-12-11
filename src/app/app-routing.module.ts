import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sets',
    pathMatch: 'full'
  },
  {
    path: 'sets',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./card-list/card-list.module').then( m => m.CardListPageModule)
      },
      {
        path: ':id/:id',
        loadChildren: () => import('./card-view/card-view.module').then( m => m.CardViewPageModule)
      },
    ]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorite-list/favorite-list.module').then( m => m.FavoriteListPageModule)
  },
  {
    path: 'favorites/:id',
    loadChildren: () => import('./card-view/card-view.module').then( m => m.CardViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
